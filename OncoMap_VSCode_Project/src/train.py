from pathlib import Path
import json, joblib, numpy as np, pandas as pd
from sklearn.model_selection import StratifiedGroupKFold
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.feature_selection import VarianceThreshold, SelectKBest, f_classif
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, balanced_accuracy_score, f1_score, classification_report
from src.data import load_data
def main():
 df=load_data(); genes=[c for c in df.columns if c not in ["sample","cancer_type"]]
 X=df[genes].apply(pd.to_numeric,errors="coerce").replace([np.inf,-np.inf],np.nan); enc=LabelEncoder(); y=enc.fit_transform(df.cancer_type.astype(str)); groups=df.sample.astype(str).str[:12]
 split=StratifiedGroupKFold(n_splits=5,shuffle=True,random_state=42); tr,te=next(split.split(X,y,groups))
 k=min(1000,X.shape[1]); pipe=Pipeline([("imputer",SimpleImputer(strategy="median")),("variance",VarianceThreshold()),("select",SelectKBest(f_classif,k=k)),("scale",StandardScaler()),("classifier",LogisticRegression(max_iter=2500,class_weight="balanced"))])
 pipe.fit(X.iloc[tr],y[tr]); pred=pipe.predict(X.iloc[te]); metrics={"accuracy":float(accuracy_score(y[te],pred)),"balanced_accuracy":float(balanced_accuracy_score(y[te],pred)),"macro_f1":float(f1_score(y[te],pred,average="macro")),"patient_overlap":len(set(groups.iloc[tr])&set(groups.iloc[te])),"report":classification_report(y[te],pred,target_names=enc.classes_,zero_division=0,output_dict=True)}
 Path("models").mkdir(exist_ok=True); Path("results/reports").mkdir(parents=True,exist_ok=True); joblib.dump({"model":pipe,"label_encoder":enc,"gene_columns":genes},"models/best_model.joblib"); Path("results/reports/model_metrics.json").write_text(json.dumps(metrics,indent=2),encoding="utf-8"); print({k:metrics[k] for k in ["accuracy","balanced_accuracy","macro_f1","patient_overlap"]})
if __name__=="__main__": main()
