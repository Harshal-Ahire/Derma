import React from "react"; 
import { useLocation, Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Analyse() {
  const location = useLocation();
  const record = location.state?.record || null;

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

  const pieData = record?.probabilities
    ? Object.entries(record.probabilities).map(([key, value], index) => ({
        name: key,
        value: value * 100,
        color: COLORS[index % COLORS.length],
      }))
    : [];

  const getRiskLevel = (confidence) => {
    if (confidence >= 95) return "High Risk";
    if (confidence >= 60) return "Medium Risk";
    return "Low Risk";
  };

  const getFullImageUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `https://harshaeve-derma.hf.space${url}`;
  };

  const handleExportPDF = () => {
    // Generate PDF report from the analysis view
    const input = document.getElementById("analyse-page");
    if (!input) return;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      ignoreElements: (element) => element.classList.contains("pdf-exclude"),
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfImgHeight);
      pdf.save("Derma_Analysis_Report.pdf");
    });
  };

  if (!record) {
    return (
      <div className="min-h-screen flex items-center justify-center font-body text-gray-500">
        <h2>No record loaded. Please upload an image on the Home page.</h2>
      </div>
    );
  }

  return (
    <div className="bg-pageGray min-h-screen flex flex-col font-body text-gray-700">
      <header className="w-full">
        <nav className="flex justify-center items-center py-7">
          <div className="w-[56rem] flex justify-between items-center text-sm text-gray-500 tracking-wide">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <Link to="/history" className="hover:text-black transition-colors pl-32">Result History</Link>
            <Link to="/evaluation" className="hover:text-black transition-colors pl-14">Model Evaluation</Link>
          </div>
        </nav>
      </header>

      <main id="analyse-page" className="flex-grow flex flex-col items-center px-12 py-12 gap-8 bg-white max-w-5xl mx-auto shadow-sm my-8 rounded-lg">
        <div className="w-full flex flex-col md:flex-row gap-12">
          {/* Diagnostic Imagery */}
          <div className="flex flex-col md:w-1/2">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Input Image</h3>
            <img
              src={getFullImageUrl(record.image_url)}
              alt="Uploaded scan"
              className="mb-6 w-full h-auto object-cover rounded shadow-sm border border-gray-100"
            />
            
            {/* Grad-CAM: Visualizes model focus areas */}
            {record.heatmapUrl && (
              <div className="mt-4">
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Grad-CAM Heatmap</h3>
                <img
                  src={getFullImageUrl(record.heatmapUrl)}
                  alt="Model attention map"
                  className="w-full h-auto object-cover rounded shadow-sm border border-gray-100"
                />
                <p className="text-[10px] text-gray-400 mt-3 italic leading-relaxed">
                  The highlighted regions indicate anatomical features that most significantly influenced the ViT classification.
                </p>
              </div>
            )}
          </div>

          {/* Classification Results */}
          <div className="md:w-1/2">
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Primary Diagnosis</h3>
              <h2 className="text-4xl font-light text-gray-900 leading-tight">{record.prediction?.class}</h2>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-sm text-gray-500">Confidence: <span className="font-semibold text-gray-900">{record.prediction?.confidence}%</span></p>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border ${
                  record.prediction?.confidence >= 95 ? "border-red-200 text-red-600 bg-red-50" : 
                  record.prediction?.confidence >= 60 ? "border-orange-200 text-orange-600 bg-orange-50" : 
                  "border-green-200 text-green-600 bg-green-50"
                }`}>
                  {getRiskLevel(record.prediction?.confidence)}
                </span>
              </div>
            </div>

            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Probability Distribution</h3>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {Object.entries(record.probabilities || {}).map(([key, val]) => (
                  <tr key={key} className={key === record.prediction?.class ? "bg-blue-50/50 font-medium text-blue-700" : ""}>
                    <td className="py-2.5">{key}</td>
                    <td className="py-2.5 text-right">{(val * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Visualization */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 border-t pt-12">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <h3 className="text-xs uppercase tracking-widest text-gray-400">Class Insight</h3>
            <div className="grid grid-cols-2 gap-4">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-xs text-gray-600 truncate">{entry.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pdf-exclude">
              <button
                onClick={handleExportPDF}
                className="px-8 py-2 bg-primary text-white text-[10px] uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-lg"
              >
                Export Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
