import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UploadComponent from "../components/UploadComponent"; // Adjust path if needed

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleAnalyse = async () => {
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // Ensure image_url is a full URL
      const fullImageUrl = data.image_url.startsWith("http")
        ? data.image_url
        : "http://127.0.0.1:5000" + data.image_url;

      navigate("/analyse", {
        state: {
          record: {
            ...data,
            image_url: fullImageUrl,
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-pageGray min-h-screen flex flex-col font-body text-gray-700">
      <header className="w-full">
        <nav className="flex justify-center items-center py-7">
          <div className="w-[56rem] flex justify-between items-center text-sm text-gray-500 tracking-wide">
            <Link to="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <Link
              to="/history"
              className="hover:text-black transition-colors pl-32"
            >
              Result History
            </Link>
            <Link
              to="/evaluation"
              className="hover:text-black transition-colors pl-14"
            >
              Model Evaluation
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col justify-start items-center px-4 text-center pt-8">
        <h1 className="font-body font-light text-[9rem] text-gray-800 mb-4 tracking-tighter">
          Derma.
        </h1>

        <div className="w-full max-w-xs flex flex-col items-center">
          {/* Upload Component */}
          <UploadComponent
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />

          {/* Analyse Button */}
          <div className="mt-5 flex flex-col items-center">
            <div
              role="button"
              className="relative bg-primary text-white px-6 py-2 text-xs rounded-none cursor-pointer overflow-hidden group"
              onClick={handleAnalyse}
            >
              <span className="relative z-10">Analyse</span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center mt-auto">
        <p className="text-xs text-gray-500 italic">
          *Derma — Intelligent skin lesion analysis for demo purposes only. Not
          intended for clinical use.
        </p>
      </footer>
    </div>
  );
}
