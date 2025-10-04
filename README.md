
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

| Parameter                     | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| **Image size**                 | 600×600 px; all images resized to a consistent dimension for the model.    |
| **Train/Validation Split**     | Stratified by lesion type; maintains class proportions in both sets.       |
| **Optimizer**                  | Adam; updates model weights efficiently to minimize loss.                  |
| **Learning Rate (LR)**         | 1e-4 (0.0001); controls the step size during weight updates.               |
| **Batch Size**                 | 32; number of images processed at a time before updating model weights.    |
| **Epochs**                     | 5; each image in the training set is seen 5 times during training.         |
| **Train Accuracy**             | 96.14%; performance on the training set.                                   |
| **Validation Accuracy**        | 96.95%; performance on unseen data.                                        |
| **Validation Loss**            | 0.10; low value indicates confident and accurate predictions.              |


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
