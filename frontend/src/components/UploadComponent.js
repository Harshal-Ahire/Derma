import React, { useRef } from "react";

export default function UploadComponent({ selectedFile, setSelectedFile }) {
  const fileInputRef = useRef(null);

  // Triggered when user selects a file
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Trigger file input when user clicks the upload box
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-xs flex flex-col items-center">
      <p className="text-sm text-gray-500 mb-2">Upload File</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      <div
        role="button"
        tabIndex="0"
        className="w-full border border-blueBorder rounded px-3 py-1 flex items-center justify-center bg-white hover:bg-blue-50 cursor-pointer"
        onClick={handleUploadClick}
      >
        <svg width="15px" height="15px" viewBox="0 0 15 15" className="mr-2">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g fill="#3B82F6">
              <rect x="6" y="1" width="3" height="13"></rect>
              <rect x="1" y="6" width="13" height="3"></rect>
            </g>
          </g>
        </svg>
        <span className="text-blueBorder text-xs">
          {selectedFile ? selectedFile.name : "Skin Image"}
        </span>
      </div>

      <p className="text-xs text-gray-400 mt-2">JPG/PNG</p>
    </div>
  );
}
