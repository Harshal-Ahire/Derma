
import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const BASE_API_URL = "https://harshaeve-derma.hf.space";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyse = async () => {
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log("Uploading image:", selectedFile.name);
      console.log("Sending request to:", `${BASE_API_URL}/predict`);

      const res = await fetch(`${BASE_API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      console.log("Backend status:", res.status);

      const responseText = await res.text();

      console.log("Backend response:", responseText);

      if (!res.ok) {
        throw new Error(
          `Backend error (${res.status}): ${responseText.slice(0, 500)}`
        );
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Backend returned an invalid JSON response."
        );
      }

      console.log("Analysis results:", data);

      if (!data || typeof data !== "object") {
        throw new Error("Invalid response received from backend.");
      }

      if (!data.prediction) {
        throw new Error(
          data.error || "Backend did not return prediction data."
        );
      }

      const normalizeUrl = (url) => {
        if (!url) return null;

        if (url.startsWith("http://") || url.startsWith("https://")) {
          return url;
        }

        return `${BASE_API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
      };

      const fullImageUrl = normalizeUrl(data.image_url);

      const fullHeatmapUrl = normalizeUrl(
        data.heatmapUrl || data.heatmap_url
      );

      const record = {
        ...data,
        image_url: fullImageUrl,
        heatmapUrl: fullHeatmapUrl,
      };

      console.log("Navigating to analysis page:", record);

      navigate("/analyse", {
        state: {
          record,
        },
      });

    } catch (err) {
      console.error("Analysis request failed:", err);

      alert(
        "Analysis failed!\n\n" +
        (err.message || "Something went wrong. Please try again.")
      );

    } finally {
      setIsLoading(false);
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

        <div className="w-full max-w-xs flex flex-col items-center -ml-4">

          <p className="text-sm text-gray-500 mb-2">
            Upload File
          </p>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />

          <div
            role="button"
            tabIndex={0}
            onClick={handleUploadClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleUploadClick();
              }
            }}
            className="border border-blueBorder rounded px-3 py-1 flex items-center justify-center bg-white hover:bg-blue-50 cursor-pointer transition-colors"
          >

            <svg
              width="15px"
              height="15px"
              viewBox="0 0 15 15"
              className="mr-2"
            >
              <g
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g fill="#3B82F6">
                  <rect x="6" y="1" width="3" height="13" />
                  <rect x="1" y="6" width="13" height="3" />
                </g>
              </g>
            </svg>

            <span className="text-blueBorder text-xs">
              {selectedFile ? selectedFile.name : "Skin Image"}
            </span>

          </div>

          <p className="text-xs text-gray-400 mt-2">
            JPG/PNG
          </p>

          <button
            type="button"
            onClick={handleAnalyse}
            disabled={isLoading}
            className="mt-5 relative bg-primary text-white px-6 py-2 text-xs rounded-none cursor-pointer overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
          >

            <span className="relative z-10">
              {isLoading ? "Analysing..." : "Analyse"}
            </span>

            {!isLoading && (
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            )}

          </button>

        </div>

      </main>

      <footer className="w-full py-6 text-center mt-auto">

        <p className="text-xs text-gray-500 italic">
          *Derma — Intelligent skin lesion analysis for demo purposes only.
        </p>

      </footer>

    </div>
  );
}
