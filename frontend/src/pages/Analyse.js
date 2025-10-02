import React from "react"; 
import { useLocation, Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Analyse() {
  const location = useLocation();
  const record = location.state?.record || null;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF0000', '#00CED1'];

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
    return url.startsWith("http") ? url : "http://127.0.0.1:5000" + url;
  };

  // ----------- PDF Export Function -----------
  const handleExportPDF = () => {
    const input = document.getElementById("analyse-page");
    if (!input) return;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      // Exclude elements with 'pdf-exclude' class (like export button)
      ignoreElements: (element) => element.classList.contains("pdf-exclude"),
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = pdfImgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfImgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("Derma_Report.pdf");
    });
  };
  // ------------------------------------------

  if (record) {
    return (
      <div className="bg-pageGray min-h-screen flex flex-col font-body text-gray-700 relative">
        <header className="w-full">
          <nav className="flex justify-center items-center py-7">
                    <div className="w-[56rem] flex justify-between items-center text-sm text-gray-500 tracking-wide">
                      <Link to="/" className="hover:text-black transition-colors">Home</Link>
                      <Link to="/history"className="hover:text-black transition-colors pl-32">Result History</Link>
                      <Link to="/evaluation" className="hover:text-black transition-colors pl-14">Model Evaluation</Link>
                    </div>
                  </nav>
        </header>

        {/* Wrap content for PDF */}
        <main id="analyse-page" className="flex-grow flex flex-col items-center px-12 mt-16 gap-8">
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12">
            {/* Left Block: Image and Prediction */}
            <div className="flex flex-col md:w-1/2">
              {record.image_url && (
                <img
                  src={getFullImageUrl(record.image_url)}
                  alt="Uploaded"
                  className="mb-4 w-full max-w-md h-auto object-cover rounded-md shadow-lg"
                />
              )}

              {/* Grad-CAM heatmap (if available) */}
              {record.heatmapUrl && (
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2">Grad-CAM</h3>
                  <img
                    src={getFullImageUrl(record.heatmapUrl)}
                    alt="Grad-CAM Heatmap"
                    className="w-full max-w-md h-auto object-cover rounded-md shadow-md"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Highlighted areas indicate regions that influenced the model's decision.
                  </p>
                </div>
              )}

              {record.prediction && (
                <div className="mb-6 text-center md:text-left">
                  <h2 className="text-2xl font-semibold">{record.prediction.class}</h2>
                  <p className="text-gray-600">Confidence: {record.prediction.confidence}%</p>
                  <p
                    className="font-medium mt-1"
                    style={{
                      color:
                        record.prediction.confidence >= 95
                          ? "red"
                          : record.prediction.confidence >= 60
                          ? "orange"
                          : "green",
                    }}
                  >
                    {getRiskLevel(record.prediction.confidence)}
                  </p>
                </div>
              )}
            </div>

            {/* Right Block: Class Probabilities Table */}
            {record.probabilities && (
              <div className="md:w-1/2">
                <h3 className="font-semibold mb-2 text-lg">Class Probabilities</h3>
                <table className="table-auto border-collapse border border-gray-300 w-full max-w-md">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1 text-left">Class</th>
                      <th className="border px-2 py-1 text-left">Probability (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(record.probabilities).map(([key, val]) => (
                      <tr
                        key={key}
                        className={key === record.prediction?.class ? "bg-yellow-100 font-semibold" : ""}
                      >
                        <td className="border px-2 py-1">{key}</td>
                        <td className="border px-2 py-1">{(val * 100).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pie Chart */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12 items-start pt-8">
            {pieData.length > 0 && (
              <div className="w-full max-w-md md:w-1/2 h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {pieData.length > 0 && (
              <div className="w-full md:w-1/2 pt-8 flex flex-col items-start">
                <h3 className="font-semibold mb-2 text-lg">Pie Chart Legend</h3>
                <table className="table-auto border-collapse border border-gray-300 w-full max-w-md">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Class</th>
                      <th className="border px-2 py-1">Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pieData.map((entry) => (
                      <tr key={entry.name}>
                        <td className="border px-2 py-1">{entry.name}</td>
                        <td className="border px-2 py-1">
                          <div className="w-6 h-6 rounded" style={{ backgroundColor: entry.color }}></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Export Button container - excluded from PDF if you keep ignore logic */}
                <div className="mt-12 flex flex-col items-end w-full pdf-exclude">
                  <button
                    onClick={handleExportPDF}
                    className="w-28 h-9 flex items-center justify-center rounded-full border border-black bg-black text-white font-thin font-montserrat hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    export
                  </button>
                  <div className="h-12"></div> {/* Blank space underneath button */}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2>No record loaded. Please upload an image on the Home page.</h2>
    </div>
  );
}
