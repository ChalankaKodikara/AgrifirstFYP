import React, { useState } from 'react';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [treatment, setTreatment] = useState(null);
  const [pdfPath, setPdfPath] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPrediction(data.prediction);
      setTreatment(data.treatment);
      setPdfPath(data.pdf_path);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDownload = () => {
    if (pdfPath) {
      window.open(`/download-pdf/${pdfPath}`);
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {prediction && <h2>Prediction: {prediction}</h2>}
      {treatment && <h2>Treatment: {treatment}</h2>}
      {pdfPath && (
        <button onClick={handleDownload}>
          Download PDF Report
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
