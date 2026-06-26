# DERMA — AI Medical Imaging Platform

DERMA is an end-to-end computer vision pipeline engineered for the classification of skin pathologies. By integrating a **Vision Transformer (ViT)**, the system achieves state-of-the-art diagnostic accuracy, surpassing traditional convolutional approaches in capturing global morphological context.

🔗 **Live Demo**: [https://derma-ui.onrender.com](https://derma-ui.onrender.com)

## Engineering & Architectural Decisions

### Why Vision Transformer (ViT) vs. CNN?

I bypassed traditional Convolutional Neural Networks (CNNs) in favor of the **Vision Transformer** architecture to solve specific domain challenges in dermatology:

* **Global Contextual Awareness**: Unlike CNNs, which are limited by local receptive fields, ViT uses **Self-Attention** to model long-range dependencies across the entire lesion. This is critical for identifying clinical features like "border irregularity" and "asymmetry".
* **Inductive Bias Flexibility**: ViT's flexible attention mechanism allows it to learn more complex, non-linear feature representations when scaled with the **HAM10000 dataset (13,000+ images)**.
* **Native Interpretability**: The Transformer architecture's attention weights provide a stronger basis for **Explainable AI (XAI)** integrations.

> Architecture based on Dosovitskiy et al., *"An Image is Worth 16x16 Words"* (ICLR 2021), adapted for medical domain fine-tuning on limited dermatological data.

## Core Engineering Features

### 1. Explainable AI (XAI) with Grad-CAM
- Implemented **Grad-CAM** to generate spatial heatmaps that highlight the exact regions (e.g., pigment networks, globules) influencing the model's prediction.
- Helps audit model decisions and increases trust in medical AI systems.

### 2. High-Fidelity Preprocessing Pipeline
- Resized images to **600x600 px** to preserve fine-grained textural details often lost in standard 224x224 px inputs.
- Built robust normalization and data serialization for multi-class probability distribution.

### 3. Decoupled Cloud Architecture
- Hosted ViT model inference on **Hugging Face** for efficient compute offloading.
- Built a Flask middleware layer for API orchestration, error handling, and Grad-CAM generation.

## Technical Stack

* **Machine Learning**: PyTorch, Vision Transformer (ViT), Hugging Face Transformers
* **Interpretability**: Grad-CAM, OpenCV
* **Backend**: Flask, Docker
* **Frontend**: React
* **Dataset**: HAM10000 (13,354 dermatoscopic images, 7 skin pathology classes)

## Performance Metrics

| Metric              | Result     | Engineering Significance                  |
|---------------------|------------|-------------------------------------------|
| Validation Accuracy | **96.95%** | High generalization on unseen cases       |
| Validation Loss     | **0.10**   | Strong model confidence                   |
| Classes             | **7**      | Covers critical skin pathologies          |

## Research References

- Dosovitskiy et al., *"An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale"*, ICLR 2021
- Yang, Luo & Greer, *"A Novel Vision Transformer Model for Skin Cancer Classification"*, Neural Processing Letters, 2023

## Disclaimer

This project is for **educational and demonstration purposes only**. It is not intended for clinical use or diagnostic decision-making.
