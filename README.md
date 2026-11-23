# OncoMap

OncoMap is an educational cancer research prototype with a 2D anatomical map and a gene-to-tumor-site lookup. The selected organ is highlighted on a simple front-view diagram. The frontend and the optional Python classifier are separate: the frontend uses a small, transparent starter association map, while the classifier requires real labeled gene-expression data and a trained model.

## Run the interactive website

Requirements: Node.js 20.19+ or 22.12+.

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite. Select a cancer cohort on the overview to highlight its organ. Open **Gene mapper**, then choose or search a listed gene; for example, `EGFR` maps to the lung cancer cohort and illuminates the lungs. Multiple links can appear for genes shared by several cohorts.

The starter map contains six TCGA cohorts: BRCA, KIRC, COAD, LUAD, PRAD, and SARC. Its gene links are an educational index, not a comprehensive or clinically reviewed reference. It does not infer disease in a person from a gene.

## Optional Python expression classifier

The original trained model and expression data were not present in the supplied archive. No model accuracy is claimed, and the website does not fabricate expression predictions. To train the research classifier, prepare a labeled expression table at `OncoMap_VSCode_Project/data/processed/oncomap_expression.csv.gz` with one sample per row, a `sample` identifier, a `cancer_type` label, and numeric gene-expression columns. Labels must use BRCA, KIRC, COAD, LUAD, PRAD, or SARC.

```powershell
cd OncoMap_VSCode_Project
py -3.11 -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m src.train
streamlit run app.py
```

Training uses stratified patient-level groups based on TCGA barcode prefixes. Metrics are saved to `results/reports/model_metrics.json`. The model artifact is written to `models/best_model.joblib`. Do not use this prototype or its outputs for diagnosis or treatment decisions.

## Project layout

- `frontend/` — React, Vite, Three.js organ explorer and gene mapper.
- `OncoMap_VSCode_Project/` — Python data, training, inference, Streamlit dashboard, and optional API scaffold.
- `OncoMap_VSCode_Project/notebooks/` — original research workflow notebooks.

## Data and privacy

The repository intentionally includes no patient dataset, trained model, or secrets. Use data you are authorized to process. Never commit `.env` files or identifiable patient data.
