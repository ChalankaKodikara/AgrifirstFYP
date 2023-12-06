import React, { useState } from "react";
import "./ImageUpload.css";
import Loader from "./loder/Loder";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [treatment, setTreatment] = useState(null);
  const [pdfPath, setPdfPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true); // Set loading to true before making the request

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setPrediction(data.prediction);
      setTreatment(data.treatment);
      setPdfPath(data.pdf_path);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div>
      <div class="heroSection">
        <div class="heroText"></div>
      </div>
      <div className="formpage">
        <br />
        <form class="form">
          <span class="form-title">Upload your file</span>
          <p class="form-paragraph">File should be an image</p>
          <label for="file-input" class="drop-container">
            <span class="drop-title">Drop files here</span>
            or
            <input
              className="file-input"
              type="file"
              accept="image/*"
              required=""
              id="file-input"
              onChange={handleFileChange}
            />
          </label>
          <button className="uploadbtn" id="file-input" onClick={handleUpload}>
            Upload
          </button>
        </form>
      </div>
      {isLoading && <Loader />} {/* Render loader when loading is true */}
      {prediction && <h2>Prediction: {prediction}</h2>}
      {treatment && <h2>Treatment: {treatment}</h2>}
    </div>
  );
};

export default ImageUpload;
