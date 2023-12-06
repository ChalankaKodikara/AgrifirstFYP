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
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default ImageUpload;
