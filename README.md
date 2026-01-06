# DERMA — AI Medical Imaging Platform

DERMA is an end-to-end medical imaging platform designed for the classification of skin lesions. The system integrates a **Vision Transformer (ViT)** model to categorize dermatological images into seven distinct pathologies with high precision.



## System Architecture

The platform is engineered as a decoupled full-stack application:
- **Frontend**: A React-based interface optimized for medical image uploads and visualization.
- **Backend**: A Flask REST API that orchestrates data flow between the user and the inference engine.
- **Inference Layer**: Leveraging a Vision Transformer (ViT) hosted on Hugging Face, specifically optimized for the HAM10000 dataset.

## Core Features

### 1. Model Interpretability (Grad-CAM)
To bridge the "black box" gap in medical AI, I implemented **Grad-CAM (Gradient-weighted Class Activation Mapping)**. This generates heatmaps that highlight the specific regions of a lesion that influenced the model's classification, providing essential visual evidence for interpretability.

### 2. Multi-Class Diagnostic Pipeline
The system standardizes raw image uploads (resizing to 600x600px) and processes them through the pipeline to identify seven categories:
- Melanoma (mel)
- Melanocytic nevi (nv)
- Basal cell carcinoma (bcc)
- Actinic keratoses (akiec)
- Benign keratosis-like lesions (bkl)
- Dermatofibroma (df)
- Vascular lesions (vasc)

### 3. Probability Distribution Mapping
Beyond a single classification, the API returns a full probability distribution, allowing users to see the model's confidence levels across all potential diagnoses.

## Technical Stack

- **Machine Learning**: PyTorch, Vision Transformer (ViT), Hugging Face Transformers
- **Explainable AI (XAI)**: Grad-CAM
- **Backend**: Python, Flask
- **Frontend**: React, Tailwind CSS
- **Deployment**: Render (Web Service), Hugging Face (Model Hosting)



## Dataset Specification
The underlying model utilizes the **HAM10000** ("Human Against Machine") dataset, a benchmark collection of 13,354 multi-source dermatoscopic images. 
- **Validation Accuracy**: 96.95%
- **Validation Loss**: 0.10

## Disclaimer
This project is for **educational and demonstration purposes only**. It is not intended for clinical use or diagnostic decision-making.

---
