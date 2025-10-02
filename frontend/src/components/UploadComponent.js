import { useState } from "react";
import axios from "axios";

const SPACE_URL = "https://harshaeve.hf.space/run/predict"; // Your HF Space URL

export default function UploadComponent() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [gradCam, setGradCam] = useState("");

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("data", [image]);

    try {
      const response = await axios.post(SPACE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const [predText, gradCamPath] = response.data.data;
      setPrediction(predText);
      setGradCam(gradCamPath);
    } catch (error) {
      console.error("Error sending to HF Space:", error);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Predict
      </button>
      {prediction && <p className="mt-2">Prediction: {prediction}</p>}
      {gradCam && <img className="mt-2 border" src={gradCam} alt="Grad-CAM" />}
    </div>
  );
}
