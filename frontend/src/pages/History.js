import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function History() {
  const [records, setRecords] = useState([]);
  const BASE_API_URL = "https://harshaeve-derma.hf.space";

  useEffect(() => {
    // Fetch historical analysis records on component mount
    fetch(`${BASE_API_URL}/history`)
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(err => console.error("History fetch error:", err));
  }, []);

  return (
    <div className="bg-pageGray min-h-screen flex flex-col font-body text-gray-700">
      <header className="w-full">
        <nav className="flex justify-center items-center py-7">
          <div className="w-[56rem] flex justify-between items-center text-sm text-gray-500 tracking-wide">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <Link to="/history" className="hover:text-black transition-colors pl-32 underline underline-offset-4">Result History</Link>
            <Link to="/evaluation" className="hover:text-black transition-colors pl-14">Model Evaluation</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex justify-center px-4 text-center">
        <table className="w-2/3 border-collapse text-center font-light mt-16 bg-white rounded shadow-sm overflow-hidden">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-gray-400">
              <th className="p-4 bg-gray-50 font-medium">Image</th>
              <th className="p-4 bg-gray-50 font-medium">Date & Time</th>
              <th className="p-4 bg-gray-50 font-medium">Result</th>
              <th className="p-4 bg-gray-50 font-medium">Details</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {records.length > 0 ? (
              records.map((rec, idx) => (
                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img
                      src={`${BASE_API_URL}${rec.image_url}`}
                      alt="Analysis input"
                      className="w-16 h-16 object-cover rounded mx-auto border border-gray-100"
                    />
                  </td>
                  <td className="p-4 text-gray-500">{rec.timestamp}</td>
                  <td className="p-4 font-medium">{rec.result}</td>
                  <td className="p-4">
                    <Link to="/analyse" state={{ record: rec }}>
                      <svg
                        className="w-4 h-4 inline-block hover:scale-110 transition-transform"
                        fill="#3B82F6"
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
                <td colSpan="4" className="py-12 text-gray-400 italic">No historical records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
