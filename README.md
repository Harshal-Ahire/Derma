# DERMA — AI Medical Imaging Platform

DERMA is an end-to-end computer vision pipeline engineered for the classification of skin pathologies. By integrating a **Vision Transformer (ViT)**, the system achieves state-of-the-art diagnostic accuracy, surpassing traditional convolutional approaches in capturing global morphological context.



## Engineering & Architectural Decisions

### Why Vision Transformer (ViT) vs. CNN?
I bypassed traditional Convolutional Neural Networks (CNNs) in favor of the **Vision Transformer** architecture to solve specific domain challenges in dermatology:

* **Global Contextual Awareness**: Unlike CNNs, which are limited by local receptive fields, ViT uses **Self-Attention** to model long-range dependencies across the entire lesion. This is critical for identifying clinical features like "border irregularity" and "asymmetry" which require a holistic view of the image.
* **Inductive Bias Flexibility**: While CNNs have an inherent spatial bias, ViT’s flexible attention mechanism allows it to learn more complex, non-linear feature representations when scaled with the **HAM10000 dataset (13,000+ images)**.
* **Native Interpretability**: The Transformer architecture’s attention weights provide a more mathematically grounded basis for **Explainable AI (XAI)** integrations compared to deep-layer activations in CNNs.

[Image comparing CNN local feature extraction vs. Vision Transformer global self-attention]

## Core Engineering Features

### 1. Explainable AI (XAI) with Grad-CAM
To solve the "Black Box" problem in medical diagnostics, I implemented **Grad-CAM (Gradient-weighted Class Activation Mapping)**. 
- **Function**: It computes the gradients of the target class score with respect to the final attention blocks.
- **Output**: Generates a spatial heatmap that "audits" the model's decision, showing exactly which visual markers (e.g., pigment networks or globules) triggered the classification.

### 2. High-Fidelity Preprocessing Pipeline
- **Input Standardization**: Implemented a normalization layer that resizes images to 600x600 px. This resolution was chosen to preserve fine-grained textural "dots" that are often lost in standard 224x224 px AI models.
- **Serialization**: Developed a RESTful bridge to serialize multi-class probability distributions, allowing for a "Confidence-First" UI where users see the margin of error between similar pathologies (e.g., Melanoma vs. Benign Nevi).

### 3. Decoupled Cloud Architecture
- **Inference Strategy**: Hosted the ViT weights on a specialized Hugging Face inference endpoint to offload compute-heavy tensor operations.
- **Orchestration**: Built a Flask-based middleware to manage API handshakes, error handling, and Grad-CAM generation, ensuring the React frontend remains lightweight and performant.



## Technical Stack

* **Machine Learning**: PyTorch, Vision Transformer (ViT), Hugging Face Transformers
* **Interpretability**: Grad-CAM, OpenCV (Heatmap Generation)
* **Infrastructure**: Python (Flask), React, Docker, Render
* **Dataset**: HAM10000 (13,354 dermatoscopic images)

## Performance Metrics

| Metric | Result | Engineering Significance |
| :--- | :--- | :--- |
| **Validation Accuracy** | **96.95%** | High generalization on unseen diagnostic cases. |
| **Validation Loss** | **0.10** | Indicates high model confidence and minimal log-loss. |
| **Classes** | **7** | Covers critical pathologies including Melanoma and Basal Cell Carcinoma. |

## Disclaimer
This project is for **educational and demonstration purposes only**. It is not intended for clinical use or diagnostic decision-making.
