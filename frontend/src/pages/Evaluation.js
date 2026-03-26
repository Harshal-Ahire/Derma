import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Evaluation() {
  const [metrics, setMetrics] = useState({});
  const [plots, setPlots] = useState({});
  
  // Deployment API endpoint
  const BASE_API_URL = "https://harshaeve-derma.hf.space";

  useEffect(() => {
    // Fetch model performance metrics and visualization plots
    fetch(`${BASE_API_URL}/evaluation`)
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data.metrics || {});
        setPlots(data.plots || {});
      })
      .catch((err) => console.error("Evaluation fetch error:", err));
  }, []);

  // Structural metadata for the ViT model
  const modelPedigree = [
    { section: "Model Architecture", content: "Vision Transformer (ViT)" },
    { section: "Foundation Model", content: "Google ViT (ImageNet21k pre-trained)" },
    { section: "Task", content: "7-Class Skin Lesion Classification" },
    { section: "Dataset", content: "Skin Cancer Dataset (HAM10000 style)" },
  ];

  const technicalSpecs = [
    { parameter: "Optimizer", specification: "Adam" },
    { parameter: "Loss Function", specification: "Cross-Entropy" },
    { parameter: "Epochs", specification: "5" },
  ];

  const performanceSummary = [
    { metric: "Validation Accuracy", value: "96.95%", significance: "Primary generalization indicator." },
    { metric: "Validation Loss", value: "0.1000", significance: "Indicates high classification confidence." },
    { metric: "Train Accuracy", value: "96.14%", significance: "Confirms minimal overfitting gap." },
  ];

  // Hardcoded training logs for progress visualization
  const trainingData = [
    { epoch: 1, train_acc: 0.7586, val_acc: 0.8355, train_loss: 0.7168, val_loss: 0.4994 },
    { epoch: 2, train_acc: 0.8466, val_acc: 0.8973, train_loss: 0.4550, val_loss: 0.3237 },
    { epoch: 3, train_acc: 0.9028, val_acc: 0.9530, train_loss: 0.2959, val_loss: 0.1790 },
    { epoch: 4, train_acc: 0.9482, val_acc: 0.9555, train_loss: 0.1595, val_loss: 0.1498 },
    { epoch: 5, train_acc: 0.9614, val_acc: 0.9695, train_loss: 0.1208, val_loss: 0.1000 },
  ];

  const metricData = Object.keys(metrics).map((key) => ({
    name: key.toUpperCase(),
    value: metrics[key],
  }));

  return (
    <div className="bg-pageGray min-h-screen flex flex-col font-body text-gray-700">
      <header className="w-full">
        <nav className="flex justify-center items-center py-7">
          <div className="w-[56rem] flex justify-between items-center text-sm text-gray-500 tracking-wide">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <Link to="/history" className="hover:text-black transition-colors pl-32">Result History</Link>
            <Link to="/evaluation" className="hover:text-black transition-colors pl-14 underline underline-offset-4">Model Evaluation</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center px-6 text-center gap-12 pb-12">
        {/* Architecture Section */}
        <section className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-xl font-semibold mb-6 text-left border-b pb-2">Model Architecture</h3>
          <table className="min-w-full text-sm mb-8">
            <tbody className="divide-y divide-gray-100">
              {modelPedigree.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-3 font-medium text-gray-500 w-1/3 text-left">{row.section}</td>
                  <td className="py-3 text-left">{row.content}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="text-lg font-medium mb-4 text-left">Training Configuration</h4>
          <table className="min-w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {technicalSpecs.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-3 font-medium text-gray-500 w-1/3 text-left">{row.parameter}</td>
                  <td className="py-3 text-left">{row.specification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Performance Metrics Section */}
        <section className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-xl font-semibold mb-6 text-left border-b pb-2">Performance Summary</h3>
          <table className="min-w-full text-sm text-left">
            <thead className="text-xs uppercase text-gray-400">
              <tr>
                <th className="pb-4 font-normal">Metric</th>
                <th className="pb-4 font-normal">Value</th>
                <th className="pb-4 font-normal">Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {performanceSummary.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-4 font-medium">{row.metric}</td>
                  <td className="py-4 text-blue-600 font-semibold">{row.value}</td>
                  <td className="py-4 text-gray-500 italic">{row.significance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Training Progress Graphs */}
        <section className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-xl font-semibold mb-8 text-left border-b pb-2">Training Progress</h3>

          <div className="grid grid-cols-1 gap-12">
            <div className="w-full">
              <h4 className="text-sm font-medium mb-4 text-gray-400 uppercase text-left">Accuracy Trends</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="epoch" axisLine={false} tickLine={false} />
                  <YAxis domain={[0.7, 1]} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="train_acc" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} name="Train Acc" />
                  <Line type="monotone" dataKey="val_acc" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} name="Val Acc" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full">
              <h4 className="text-sm font-medium mb-4 text-gray-400 uppercase text-left">Loss Convergence</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="epoch" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="train_loss" stroke="#EF4444" strokeWidth={2} name="Train Loss" />
                  <Line type="monotone" dataKey="val_loss" stroke="#F59E0B" strokeWidth={2} name="Val Loss" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Detailed Metrics & Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {metricData.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-sm font-semibold mb-4 text-left uppercase text-gray-400 tracking-wider">Classification Metrics</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={metricData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 1]} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f9fafb' }} />
                  <Bar dataKey="value" fill="#1F2937" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {plots.confusion_matrix && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-sm font-semibold mb-4 text-left uppercase text-gray-400 tracking-wider">Confusion Matrix</h4>
              <img className="w-full rounded border border-gray-50" src={plots.confusion_matrix} alt="Model Confusion Matrix" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
