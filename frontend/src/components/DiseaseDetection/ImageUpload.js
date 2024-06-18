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
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            formData.append(
              "location",
              JSON.stringify({
                latitude: latitude,
                longitude: longitude,
              })
            );

            // Get province information
            const province = await getProvince(latitude, longitude);
            formData.append("province", province);

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
              latitude: latitude,
              longitude: longitude,
              province: province,
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

  async function getProvince(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Extract province information from the address
      const address = data.address;
      if (address && address.state) {
        return address.state; // Return the province name
      } else {
        return "Unknown";
      }
    } catch (error) {
      console.error("Error fetching province:", error);
      return "Unknown";
    }
  }

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
      <button className="buttonrg" onClick={handleUpload}>
        Upload
      </button>

      {prediction && treatment && (
        <div >
          <div className="flex justify-center mt-[5%] px-4">
            <div className=" shadow-lg bg-white w-[500px] h-[195px] rounded-[15px]">
              <div className="flex justify-center mt-4">
                <p className="text-[#252C58] font-sans text-[36px] font-bold"></p>
              </div>
              <div className="flex justify-center font-sans">
                <p className="text-[#252C58] text-sm">Prediction</p>
              </div>
              <div className="flex justify-center text-xl font-semibold">{prediction}</div>
              <div className="px-8 font-sans">
                <p className="text-[18px] mt-[10px] font-sans">Treatment </p>
                <p className="text-[#252C58] font-bold text-[20px]">
                  {treatment}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
