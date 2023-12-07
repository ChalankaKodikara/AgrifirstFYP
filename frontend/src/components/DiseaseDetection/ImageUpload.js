import React, { useState } from "react";
import "./ImageUpload.css";
import Loader from "./loder/Loder";

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
    }
  };

  return (
    <div>
      <div class="heroSection">
        <div class="heroText"></div>
      </div>
      <div className="formpage">
        <form class="formu">
          <span class="formu-title">Upload your file</span>
          <p class="formu-paragraph">File should be an image</p>
          <label for="file-input" class="dropu-container">
            <span class="drop-title">Drop files here</span>
            or
            <input type="file" onChange={handleFileChange} />
          </label>
        </form>{" "}
      </div>
      <div className="buttonpr">
        <button className="uploadbtn" id="file-input" onClick={handleUpload}>
          Upload
        </button>
      </div>
      <div className="prediction ">
        <div class="notifications-container">
          <div class="success">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="succes-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div class="success-prompt-wrap">
                <p class="success-prompt-heading">
                  {" "}
                  {prediction && <h2>Prediction: {prediction}</h2>}
                </p>
                <div class="success-prompt-prompt">
                  <p>{treatment && <h2>Treatment: {treatment}</h2>}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
export default ImageUpload;
