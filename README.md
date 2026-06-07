# Single-Cell Transcriptomics Analysis of Tuberculosis Granulomas Reveals Host-Directed Drug Candidates Through Ensemble Machine Learning

## Overview

This repository contains the complete analysis pipeline for identifying host-directed therapeutic candidates for tuberculosis (TB) using ensemble machine learning applied to single-cell RNA sequencing data from human lung granulomas.

The pipeline processes Seq-Well scRNA-seq data from surgically resected lung tissue of TB-positive and TB-negative individuals from a South African cohort (Broad Institute Single Cell Portal, accession [SCP3227](https://singlecell.broadinstitute.org/single_cell/study/SCP3227)), trains four ensemble classifiers, extracts a SHAP-derived disease signature, and queries the L1000 Connectivity Map for drug repurposing candidates.

## Key Results

- **LightGBM** achieved the highest classification performance (AUC-ROC = 0.970)
- Hyperparameter tuning did not improve baseline performance, confirming robust default configurations
- SHAP analysis identified a **100-gene disease signature** (59 upregulated, 41 downregulated) consistent with known TB immunopathology
- L1000 Connectivity Map query returned **1,831 significant drug candidates** (adjusted *P* < 0.05)
- Top-ranked candidates include adenosine triphosphate, monensin, tracazolate, cephaeline, and anisomycin

## Repository Structure

```
.
├── 01_load_and_qc.py                  # Step 1: Data loading and quality control
├── 02_prepare_ml_data.py              # Step 2: ML data preparation and splitting
├── 03_ensemble_ml.py                  # Step 3: Ensemble model training and evaluation
├── 04_model_improvement.py            # Step 4: Hyperparameter tuning with Optuna
├── 05_shap_analysis.py                # Step 5: SHAP interpretability analysis
├── 06_drug_repurposing.py             # Step 6: L1000 Connectivity Map drug repurposing
├── generate_manuscript_figures.py     # Publication-quality figure generation
├── TB_Drug_Repurposing_Pipeline.ipynb # Complete pipeline in a single Jupyter notebook
├── project_context.md                 # Project background and context
├── manuscript/                        # LaTeX manuscript and references
│   ├── main.tex
│   ├── main.pdf
│   ├── main.bbl
│   └── references.bib
├── results/                           # Analysis outputs
│   ├── disease_signature.csv          # 100-gene SHAP disease signature
│   ├── repurposed_drugs.csv           # L1000 drug repurposing results
│   ├── test_results.csv               # Model performance on held-out test set
│   ├── cv_results.csv                 # Cross-validation results
│   ├── tuned_vs_baseline_comparison.csv
│   ├── full_gene_ranking.csv          # Complete gene importance ranking
│   └── figures/
│       └── manuscript/                # Publication-quality figures (Figs. 1-6, Supp.)
├── data/
│   └── ml_ready/                      # Preprocessed ML-ready data splits
├── models/
│   └── best_model.txt                 # Best model identifier
└── presentation/                      # Conference presentation materials
```

## Data Availability

The raw scRNA-seq data are publicly available at the Broad Institute Single Cell Portal under accession **SCP3227**:
- https://singlecell.broadinstitute.org/single_cell/study/SCP3227

To reproduce the analysis from scratch, download the raw count matrix and metadata from SCP3227 and place them in the `data/` directory. The preprocessed ML-ready data splits are included in `data/ml_ready/`.

> **Note:** Large files (raw data, processed h5ad, trained model weights) are excluded from this repository due to GitHub file size limits. The pipeline includes conditional caching, so intermediate results are regenerated automatically on first run.

## Pipeline Execution

### Option 1: Jupyter Notebook (Recommended)

Run the complete pipeline interactively:

```bash
jupyter notebook TB_Drug_Repurposing_Pipeline.ipynb
```

### Option 2: Modular Python Scripts

Run each step sequentially:

```bash
python 01_load_and_qc.py
python 02_prepare_ml_data.py
python 03_ensemble_ml.py
python 04_model_improvement.py
python 05_shap_analysis.py
python 06_drug_repurposing.py
python generate_manuscript_figures.py
```

Each script checks for cached intermediate results and skips completed steps unless `FORCE_RERUN = True` is set.

## Requirements

- Python 3.10+
- Key dependencies: `scanpy`, `scikit-learn`, `xgboost`, `lightgbm`, `shap`, `optuna`, `matplotlib`, `seaborn`, `pandas`, `numpy`, `scipy`

Install dependencies:

```bash
pip install scanpy scikit-learn xgboost lightgbm shap optuna matplotlib seaborn pandas numpy scipy requests
```

## Citation

If you use this code or the disease signature in your work, please cite:

```
Odur, W. (2026). Single-cell transcriptomics analysis of tuberculosis granulomas
reveals host-directed drug candidates through ensemble machine learning.
```

## License

This project is provided for academic and research purposes.

## Contact

Walter Odur — walter.odur@students.mak.ac.ug

Department of Immunology and Molecular Biology, Makerere University, Kampala, Uganda
The African Center of Excellence in Bioinformatics and Data Intensive Sciences, Makerere University
