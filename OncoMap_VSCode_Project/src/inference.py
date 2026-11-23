from pathlib import Path

import joblib
import numpy as np
import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[1]


def load_bundle(path=None):
    """Load the trained bundle from an explicit path or this project directory."""
    model_path = Path(path) if path else PROJECT_ROOT / "models" / "best_model.joblib"
    if not model_path.is_absolute():
        model_path = PROJECT_ROOT / model_path
    if not model_path.exists():
        raise FileNotFoundError(
            f"Trained model not found at {model_path}. Add labeled expression data "
            "and run `python -m src.train` first."
        )
    bundle = joblib.load(model_path)
    required = {"model", "label_encoder", "gene_columns"}
    if not required.issubset(bundle):
        raise ValueError(f"Model bundle is missing keys: {sorted(required - set(bundle))}")
    return bundle


def predict_upload(upload, bundle):
    """Predict classes for a CSV with one sample per row and trained gene columns."""
    try:
        df = pd.read_csv(upload)
    except Exception as exc:
        raise ValueError(f"Could not read CSV: {exc}") from exc
    if df.empty:
        raise ValueError("The uploaded CSV has no sample rows.")

    ids = (df["sample"].astype(str) if "sample" in df.columns
           else pd.Series([f"sample_{i + 1}" for i in range(len(df))]))
    features = df.drop(columns=["sample"], errors="ignore")
    genes = list(bundle["gene_columns"])
    missing = [gene for gene in genes if gene not in features.columns]
    if missing:
        sample = ", ".join(missing[:8])
        suffix = "…" if len(missing) > 8 else ""
        raise ValueError(f"Missing {len(missing)} trained gene columns: {sample}{suffix}")

    X = features.loc[:, genes].apply(pd.to_numeric, errors="coerce")
    X = X.replace([np.inf, -np.inf], np.nan)
    empty = X.columns[X.isna().all()].tolist()
    if empty:
        raise ValueError(f"These required genes have no numeric values: {', '.join(empty[:8])}")

    model = bundle["model"]
    encoded = model.predict(X)
    labels = bundle["label_encoder"].inverse_transform(encoded)
    output = pd.DataFrame({"sample": ids, "predicted_cancer_type": labels})
    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(X)
        classes = bundle["label_encoder"].inverse_transform(model.classes_)
        output["confidence"] = probabilities.max(axis=1)
        output["top_alternative"] = [classes[row.argsort()[-2]] if len(row) > 1 else "" for row in probabilities]
    return output
