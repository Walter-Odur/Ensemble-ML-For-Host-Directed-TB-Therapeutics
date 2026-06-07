# Tuberculosis Single-Cell ML Drug Repurposing Project

## 1. Problem Statement
The rise of drug-resistant Tuberculosis requires the urgent discovery of novel "Host-Directed Therapies" (HDTs). While researchers have used Machine Learning to repurpose drugs for TB in the past, they largely relied on noisy "bulk" tissue data or datasets primarily from Western/Asian cohorts, missing crucial high-resolution, population-specific targets.

**Our Objective:** Build an advanced Ensemble Machine Learning pipeline that analyzes true single-cell RNA sequencing data (Seq-Well) from the lung granulomas of Sub-Saharan African TB patients to computationally discover highly precise, FDA-approved, repurposed drugs.

## 2. Dataset Information
We are utilizing the Lung Granuloma Dataset from the Broad Institute Single Cell Portal.
* **Accession:** SCP3227
* **Required Files (Already placed in `data/`):**
  1. `final_sw_dataset_raw_counts.csv` (The pure single-cell expression matrix)
  2. `TB_single_cell_meta_UMAP.csv` (The metadata / answer key for Infected vs. Healthy cells)

## 3. The ML Ensemble Pipeline Architecture
To extract the most rigorous "Disease Signature" possible, we are going far beyond standard statistics. We will train and cross-validate at least 4 ML models:
1. **Bagging:** Random Forest Classifier
2. **Boosting:** XGBoost Classifier
3. **Boosting (Alternative):** AdaBoost / LightGBM Classifier
4. **Stacking:** A meta-classifier combining the predictions of the base models.

**Feature Extraction:** We will select the highest-performing architecture and run **SHAP (Shapley Additive Explanations)** over it to identify the master regulator genes driving the TB infection.

## 4. Final Output (Drug Repurposing)
The ML-derived disease signature will be fed into the **Connectivity Map (CMap/L1000)** database (via the `gseapy` library). The final output of this pipeline will be a ranked list of existing FDA-approved drugs mathematically predicted to reverse the specific lung pathology of TB.
