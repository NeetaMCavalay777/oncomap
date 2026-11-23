# OncoMap
Academic pan-cancer gene-expression research prototype for TCGA BRCA, KIRC, COAD, LUAD, PRAD, and SARC. Not a clinical diagnostic tool.

## Tech stack
Python 3.11+, pandas, NumPy, scikit-learn, joblib, Streamlit (UI), Plotly (charts), optional PyTorch (gradient descent MLP), SHAP (explainability), g:Profiler (pathway enrichment). Vercel Python Functions provide an optional API. **Vercel does not natively host Streamlit's persistent websocket server**: run Streamlit locally or on Streamlit Community Cloud, deploy the API folder to Vercel.

## Setup in VS Code
Open this folder. Create environment: `py -3.11 -m venv .venv` (Windows), activate `.venv\Scripts\activate`; macOS/Linux: `python3 -m venv .venv`, `source .venv/bin/activate`. Then `python -m pip install -r requirements.txt`.

Place processed table at `data/processed/oncomap_expression.csv.gz` with rows=samples and columns=`sample`, gene features, `cancer_type`. Train via `python -m src.train`; run dashboard via `streamlit run app.py`.

Source data is user-supplied from UCSC Xena TCGA Pan-Cancer Atlas. Raw/processed data and model artifacts are excluded from git.
