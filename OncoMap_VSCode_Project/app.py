import streamlit as st
import pandas as pd
import plotly.express as px
from pathlib import Path
from src.inference import load_bundle, predict_upload
st.set_page_config(page_title="OncoMap", page_icon="🧬", layout="wide")
st.title("🧬 OncoMap")
st.caption("TCGA pan-cancer expression explorer · Research only, not for clinical diagnosis")
data_path=Path("data/processed/oncomap_expression.csv.gz"); model_path=Path("models/best_model.joblib")
t1,t2,t3=st.tabs(["Overview","Dataset explorer","Prediction"])
with t1:
 a,b=st.columns(2); a.metric("Processed data", "Ready" if data_path.exists() else "Missing"); b.metric("Model", "Ready" if model_path.exists() else "Not trained")
 st.write("Cohorts: BRCA · KIRC · COAD · LUAD · PRAD · SARC")
 st.warning("Academic prototype only. Not a diagnostic tool or medical advice.")
with t2:
 if data_path.exists():
  df=pd.read_csv(data_path,compression="gzip"); st.write(f"{len(df):,} samples | {df.shape[1]-2:,} gene columns")
  counts=df.cancer_type.value_counts().rename_axis("cancer_type").reset_index(name="samples"); st.plotly_chart(px.bar(counts,x="cancer_type",y="samples"),use_container_width=True); st.dataframe(df.head(20),use_container_width=True)
 else: st.info("Add data/processed/oncomap_expression.csv.gz")
with t3:
 upload=st.file_uploader("Upload CSV with sample rows and training gene columns",type=["csv"])
 if upload:
  if model_path.exists():
   try: st.dataframe(predict_upload(upload,load_bundle(model_path)),use_container_width=True)
   except Exception as e: st.error(str(e))
  else: st.warning("Train first: python -m src.train")
