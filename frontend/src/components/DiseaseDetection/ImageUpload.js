import React, { useState } from "react";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [treatment, setTreatment] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const saveResults = async (data, location) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log("UserID:", userId);

      await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prediction: data.prediction,
          treatment: data.treatment,
          userId,
          location,
        }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    // Append userId to the FormData object
    const userId = localStorage.getItem("userId");
    formData.append("userId", userId);
  
    try {
      // Get browser's geolocation
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            // Include location data in form
            formData.append(
              "location",
              JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              })
            );
  
            const response = await fetch("http://localhost:5000/predict", {
              method: "POST",
              body: formData,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            const data = await response.json();
            setPrediction(data.prediction);
            setTreatment(data.treatment);
  
            // Save results
            await saveResults(data, {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting geolocation:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
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
      <div
        className="prediction"
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {prediction && treatment && (
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
                      <h2>Prediction: {prediction}</h2>
                    </p>
                    <div className="success-prompt-prompt">
                      <p>
                        <h2>Treatment: {treatment}</h2>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
