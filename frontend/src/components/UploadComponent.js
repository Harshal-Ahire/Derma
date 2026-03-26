import React, { useRef } from "react";

export default function UploadComponent({ selectedFile, setSelectedFile }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    // Update parent state with the selected image file
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    // Programmatically trigger the hidden native file input
    fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-xs flex flex-col items-center">
      <p className="text-sm text-gray-500 mb-2 font-body">Upload File</p>

      {/* Hidden input for native file selection functionality */}
      <input
        type="file"
        id="skin-upload-input"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      <div className="flex items-center justify-center w-full">
        <div
          role="button"
          tabIndex="0"
          className="border border-blueBorder rounded px-3 py-1 flex items-center justify-center bg-white hover:bg-blue-50 cursor-pointer transition-colors"
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
          <span className="text-blueBorder text-xs font-body">
            {selectedFile ? selectedFile.name : "Skin Image"}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2 font-body">JPG/PNG</p>
    </div>
  );
}
