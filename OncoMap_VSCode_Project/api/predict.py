from pathlib import Path
import joblib,numpy as np
def handler(request):
 p=Path("models/best_model.joblib")
 if not p.exists(): return {"error":"Model artifact not configured"},503
 body=request.get_json(silent=True) if hasattr(request,"get_json") else None
 if not body or "features" not in body: return {"error":"JSON needs features array in trained gene order"},400
 b=joblib.load(p); x=np.asarray(body["features"],dtype=float).reshape(1,-1)
 if x.shape[1]!=len(b["gene_columns"]): return {"error":f"Expected {len(b['gene_columns'])} feature values"},400
 pred=b["model"].predict(x)[0]; label=b["label_encoder"].inverse_transform([pred])[0]; confidence=float(b["model"].predict_proba(x).max())
 return {"predicted_cancer_type":str(label),"confidence":confidence,"research_only":True}
