# **Derma — End-to-End Skin Lesion Classification Web App**

[![Model](https://img.shields.io/badge/Model-ViT-blue?style=for-the-badge)](https://huggingface.co/Anwarkh1/Skin_Cancer-Image_Classification)
[![Dataset](https://img.shields.io/badge/Dataset-HAM10000-orange?style=for-the-badge)](https://huggingface.co/datasets/marmal88/skin_cancer)
[![License](https://img.shields.io/badge/License-Apache--2.0-green?style=for-the-badge)](https://github.com/yourusername/derma/blob/main/LICENSE)
[![Live App](https://img.shields.io/badge/Live%20App-Derma%20on%20Render-brightgreen?style=for-the-badge)](https://derma-ui.onrender.com/)
🔗 **Model link:** [ViT Skin Cancer Classification on Hugging Face](https://huggingface.co/Anwarkh1/Skin_Cancer-Image_Classification)

---

## **About**
- End-to-end web app for **7-class skin lesion classification** using Google’s Vision Transformer (ViT) model hosted on Hugging Face.  
- Model trained on **Marmal88's HAM10000-derived Skin Cancer Dataset (13,354 images)**.  
- Achieves **96.95% validation accuracy**.  
- Includes **Grad-CAM visualizations** for model interpretability.  
- 🔗 **Check out the live app:** [Derma on Render](https://derma-ui.onrender.com/)

---

## **Dataset Overview**
- **Dataset Name:** HAM10000 (via Marmal88 on Hugging Face)  
- **Number of images:** 13,354  
- **Image size:** 600x600 px  
- **Classes (7):**  
  - Actinic keratoses (akiec)  
  - Basal cell carcinoma (bcc)  
  - Benign keratosis-like lesions (bkl)  
  - Dermatofibroma (df)  
  - Melanocytic nevi (nv)  
  - Melanoma (mel)  
  - Vascular lesions (vasc)  
- **Other metadata:** age, sex, lesion localization, histopathology confirmed  
- **Train/Validation Split:** Stratified by lesion type  

🔗 **Dataset link:** [HAM10000 on Hugging Face](https://huggingface.co/datasets/marmal88/skin_cancer)

---

## **Model Overview**
- **Architecture:** Vision Transformer (ViT)  
- **Pre-trained Model:** Google ViT (16x16 patch size, ImageNet21k)  
- **Modified Head:** Replaced classification head for 7-class task  
- **Optimizer:** Adam, LR=1e-4  
- **Loss Function:** Cross-Entropy Loss  
- **Batch Size:** 32  
- **Epochs:** 5  
- **Train Accuracy:** 96.14%  
- **Validation Accuracy:** 96.95%  
- **Validation Loss:** 0.10  

---

## **Key Features**
- Upload **skin images (JPG/PNG)** to classify into 7 lesion categories  
- **Grad-CAM heatmaps** for interpretability  
- View **class probabilities** for detailed prediction insight  
- Fully **deployed web application** with Flask backend, React frontend, and Render hosting  

---

## **Tech Stack**
- **Frontend:** React, Tailwind CSS  
- **Backend:** Flask (Python)  
- **Model Hosting:** Hugging Face Spaces  
- **Deployment:** Render  

---

## **Disclaimer**
- This project is for **educational and demonstration purposes only**.  
- **Not intended for clinical or diagnostic use**.
