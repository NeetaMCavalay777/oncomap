from pathlib import Path
import pandas as pd
COHORTS=["BRCA","KIRC","COAD","LUAD","PRAD","SARC"]
def load_data(path="data/processed/oncomap_expression.csv.gz"):
 p=Path(path)
 if not p.exists(): raise FileNotFoundError(f"Processed data missing: {p}")
 df=pd.read_csv(p,compression="gzip" if str(p).endswith(".gz") else None)
 if not {"sample","cancer_type"}.issubset(df.columns): raise ValueError("Dataset must have sample and cancer_type columns")
 return df[df.cancer_type.isin(COHORTS)].copy()
