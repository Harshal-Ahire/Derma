import React from "react"; 
import { useLocation, Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Analyse() {
  const location = useLocation();
  const record = location.state?.record || null;

  if (!record) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>No record loaded. Please upload an image on the Home page.</h2>
      </div>
    );
  }

  const predictionText = record.result || "No prediction";
  const gradcamUrl = record.image_url || null;
  const probabilities = record.probabilities || null;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF0000', '#00CED1'];

  const pieData = probabilities
    ? Object.entries(probabilities).map(([key, value], index) => ({
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

  const getConfidence = (text) => {
    // Extract number from string like "Melanoma (95.23%)"
    const match = text.match(/\((\d+(\.\d+)?)%\)/);
    return match ? parseFloat(match[1]) : null;
  };

  const confidence = getConfidence(predictionText);

  const handleExportPDF = () => {
    const input = document.getElementById("analyse-page");
    if (!input) return;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      ignoreElements: (el) => el.classList.contains("pdf-exclude"),
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

      <main id="analyse-page" className="flex-grow flex flex-col items-center px-12 mt-16 gap-8">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12">
          <div className="flex flex-col md:w-1/2">
            {gradcamUrl && (
              <img
                src={gradcamUrl}
                alt="Grad-CAM"
                className="mb-4 w-full max-w-md h-auto object-cover rounded-md shadow-lg"
              />
            )}

            <div className="mb-6 text-center md:text-left">
              <h2 className="text-2xl font-semibold">{predictionText}</h2>
              {confidence !== null && (
                <>
                  <p className="text-gray-600">Confidence: {confidence}%</p>
                  <p
                    className="font-medium mt-1"
                    style={{
                      color:
                        confidence >= 95
                          ? "red"
                          : confidence >= 60
                          ? "orange"
                          : "green",
                    }}
                  >
                    {getRiskLevel(confidence)}
                  </p>
                </>
              )}
            </div>
          </div>

          {probabilities && (
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
                  {Object.entries(probabilities).map(([key, val]) => (
                    <tr
                      key={key}
                      className={key === predictionText.split(" ")[0] ? "bg-yellow-100 font-semibold" : ""}
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

        {pieData.length > 0 && (
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12 items-start pt-8">
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

              <div className="mt-12 flex flex-col items-end w-full pdf-exclude">
                <button
                  onClick={handleExportPDF}
                  className="w-28 h-9 flex items-center justify-center rounded-full border border-black bg-black text-white font-thin font-montserrat hover:bg-white hover:text-black transition-colors duration-300"
                >
                  export
                </button>
                <div className="h-12"></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
