import React, { useState } from "react";
import "./ImageUpload.css";
import Loader from "./loder/Loder";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [treatment, setTreatment] = useState(null);

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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="heroSection">
        <div className="heroText"></div>
      </div>
      <div className="formpage">
        <br />
        <form className="formu">
          <span className="form-title">Upload your file</span>
          <p className="form-paragraph">File should be an image</p>
          <label htmlFor="file-input" className="drop-container">
            <span className="drop-title">Drop files here</span>
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
        </form>
      </div>
      <div className="formpage">
        <button className="buttonrg" onClick={handleUpload}>
          Upload
        </button>
      </div>
      <div className="prediction ">
        <div className="notifications-container">
          <div className="success">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="succes-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  ></path>
                </svg>
              </div>
              <br />
              <div className="successpg">
                <div className="success-prompt-wrap">
                  <p className="success-prompt-heading">
                    {prediction && <h2>Prediction: {prediction}</h2>}
                  </p>
                  <div className="success-prompt-prompt">
                    <p>{treatment && <h2>Treatment: {treatment}</h2>}</p>
                  </div>
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
