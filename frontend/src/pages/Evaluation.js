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

  useEffect(() => {
    fetch("http://127.0.0.1:5000/evaluation")
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data.metrics);
        setPlots(data.plots);
      })
      .catch((err) => console.error(err));
  }, []);

  // Static Model Info Tables
  const modelPedigree = [
    { section: "Model Architecture", content: "Vision Transformer (ViT)" },
    { section: "Foundation Model", content: "Google ViT, pre-trained on ImageNet21k" },
    { section: "Task", content: "7-Class Skin Lesion Classification" },
    { section: "Dataset", content: "Marmal88's Skin Cancer Dataset" },
  ];

  const technicalSpecs = [
    { parameter: "Optimizer", specification: "Adam" },
    { parameter: "Loss Function", specification: "Cross-Entropy Loss" },
    { parameter: "Epochs", specification: "5" },
  ];

  const performanceSummary = [
    {
      metric: "Final Validation Accuracy",
      value: "96.95%",
      significance: "Primary indicator of generalization on unseen data.",
    },
    {
      metric: "Final Validation Loss",
      value: "0.1000",
      significance: "Proves the model achieved a high degree of confidence and accuracy.",
    },
    {
      metric: "Final Train Accuracy",
      value: "96.14%",
      significance: "Shows a low overfitting gap between train and validation performance.",
    },
  ];

  // Simulated training progress
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
      {/* Navbar */}
      <header className="w-full">
        <nav className="flex justify-center items-center py-7">
          <div className="w-[56rem] flex justify-between items-center text-sm text-gray-500 tracking-wide">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <Link to="/history" className="hover:text-black transition-colors pl-32">Result History</Link>
            <Link to="/evaluation" className="hover:text-black transition-colors pl-14">Model Evaluation</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center px-6 text-center gap-12">
        {/* Model Architecture & Origin */}
        <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-left">Model Architecture & Origin</h3>
          <table className="min-w-full divide-y divide-gray-200 mb-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {modelPedigree.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">{row.section}</td>
                  <td className="px-6 py-3">{row.content}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="text-lg font-medium mb-2 text-left">Technical Specifications</h4>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specification</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {technicalSpecs.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">{row.parameter}</td>
                  <td className="px-6 py-3">{row.specification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Performance Summary */}
        <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-left">Quantitative Performance Summary</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Significance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceSummary.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">{row.metric}</td>
                  <td className="px-6 py-3">{row.value}</td>
                  <td className="px-6 py-3">{row.significance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Training Progress Visualization */}
        <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-left">Training Progress Visualization</h3>

          <div className="w-full mb-8">
            <h4 className="text-lg font-medium mb-2 text-left">Accuracy over Epochs</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="train_acc" stroke="#4A90E2" name="Train Accuracy" />
                <Line type="monotone" dataKey="val_acc" stroke="#50E3C2" name="Validation Accuracy" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full">
            <h4 className="text-lg font-medium mb-2 text-left">Loss over Epochs</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis domain={[0, Math.max(...trainingData.map(d => Math.max(d.train_loss, d.val_loss)))]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="train_loss" stroke="#FF6B6B" name="Train Loss" />
                <Line type="monotone" dataKey="val_loss" stroke="#FFA500" name="Validation Loss" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Existing dynamic metrics chart */}
        {metrics && Object.keys(metrics).length > 0 && (
          <div className="w-full md:w-2/3 mb-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metricData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Bar dataKey="value" fill="#4A90E2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Confusion Matrix */}
        {plots && plots.confusion_matrix && (
          <div className="mt-4 w-full max-w-4xl">
            <h3 className="font-semibold mb-2 text-left">Confusion Matrix</h3>
            <img className="w-full rounded-md shadow" src={plots.confusion_matrix} alt="Confusion Matrix" />
          </div>
        )}
      </main>
    </div>
  );
}
