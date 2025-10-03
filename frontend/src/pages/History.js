import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function History() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // ⚠️ FIX APPLIED HERE: Base URL for API calls
    const BASE_API_URL = "https://harshaeve-derma.hf.space"; 

    fetch(BASE_API_URL + "/history")
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-pageGray min-h-screen flex flex-col font-body text-gray-700">
      {/* Navbar */}
      <header className="w-full">
        <nav className="flex justify-center items-center py-7">
          <div className="w-[56rem] flex justify-between items-center text-sm text-gray-500 tracking-wide">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <Link to="/history"className="hover:text-black transition-colors pl-32">Result History</Link>
            <Link to="/evaluation" className="hover:text-black transition-colors pl-14">Model Evaluation</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex justify-center px-4 text-center">
        <table className="w-2/3 border-collapse text-center font-light mt-16 bg-white rounded overflow-hidden">
          <thead>
            <tr>
              <th className="p-1 bg-gray-100">Image</th>
              <th className="p-1 bg-gray-100">Date & Time</th>
              <th className="p-1 bg-gray-100">Result</th>
              <th className="p-1 bg-gray-100">Details</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((rec, idx) => (
                <tr key={idx}>
                  <td>
                    <img
                      // ⚠️ FIX APPLIED HERE: Base URL for image source
                      src={"https://harshaeve-derma.hf.space" + rec.image_url}
                      alt="upload"
                      className="w-20 h-20 object-cover rounded mx-auto"
                    />
                  </td>
                  <td>{rec.timestamp}</td>
                  <td>{rec.result}</td>
                  <td>
                    <Link to="/analyse" state={{ record: rec }}>
                      <svg
                        className="w-4 h-4 inline-block cursor-pointer"
                        fill="#3B82F6" // changed from #000 to blue
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="19.2 22.3 160.1 158.5"
                      >
                        <path d="M88.5 22.3v5.8h80.9L19.2 176.7l4.1 4.1L173.6 32.1v80.2h5.7v-90H88.5z"/>
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-gray-400">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
