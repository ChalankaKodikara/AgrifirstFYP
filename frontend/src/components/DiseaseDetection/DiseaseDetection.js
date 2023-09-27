import { useState, useEffect, useRef } from "react";
import default_crop from "../../assets/images/DiseaseDetectionPage/crop.jpg";
import { axiosInstance } from "../../axios.config";
import { useTranslation, Trans } from "react-i18next";
import LoadingBar from "react-top-loading-bar";
import { BsSearch } from "react-icons/bs";
import { IoReloadOutline } from "react-icons/io5";

const DiseaseDetection = () => {
  const { t, i18n } = useTranslation();

  const [imageUploaded, setUploadedImage] = useState();
  const [preview, setPreview] = useState(null);
  const [isPreview, setIsPreview] = useState();
  const [location, setLocation] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const ref = useRef();

  // const [isLocation, setIsLocation] = useState(false);
  const drop = useRef(null);
  useEffect(() => {
    if (!imageUploaded) {
      setPreview(undefined);
      setIsPreview(false);
      return;
    }

    const objectUrl = URL.createObjectURL(imageUploaded);
    setPreview(objectUrl);
    setIsPreview(true);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageUploaded]);

  useEffect(() => {
    position();
  }, []);
  const position = async () => {
    await navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        // setIsLocation(true);
      },
      function (err) {
        console.log(err);
      }
    );
  };
  const imageUploadHandler = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadedImage(undefined);
      return;
    }
    setUploadedImage(e.target.files[0]);
  };
  useEffect(() => {
    drop.current.addEventListener("dragover", handleDragOver);
    drop.current.addEventListener("drop", handleDrop);

    return () => {
      drop?.current?.removeEventListener("dragover", handleDragOver);
      drop?.current?.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleDragOver = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    // this is required to convert FileList object to array
    if (ev.dataTransfer.items) {
      console.log(ev.dataTransfer.items);
      if (ev.dataTransfer.items["length"] === 1) {
        var file = ev.dataTransfer.items[0].getAsFile();
        if (file && file["type"].split("/")[0] !== "image") {
          return;
        }
        var image = URL.createObjectURL(file);
        setPreview(image);
        setIsPreview(true);
        return () => URL.revokeObjectURL(file);
      }
    }
  };
  const goBackHandler = () => {
    setSuccessData(false);
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (preview === undefined) {
      return;
    }
    ref.current.continuousStart();

    /* if(location === null){
      position();
      return;
    }*/

    var data = new FormData();

    data.append("image", imageUploaded);
    axiosInstance
      .post("/dl/detection", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setSuccessData(response.data);
        ref.current.complete();
      })
      .catch((error) => {
        console.log(error);
        ref.current.complete();
      });
  };
  return (
    <>
      <LoadingBar color="#22E089" ref={ref} height="3px" />
      {!successData && (
        <div className="md:grid md:grid-cols-2 place-items-center bg-gray-100">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={submitForm}>
              <div className="shadow-2xl my-6 sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t("description.diseaseDetection.0")}
                    </label>
                    <div className="mt-1 flex justify-center">
                      {!isPreview && (
                        <img
                          src={default_crop}
                          className="p-1 bg-white border rounded max-w-sm opacity-50"
                          alt="Default"
                          required
                        ></img>
                      )}
                      {isPreview && (
                        <img
                          src={preview}
                          className="p-1 bg-white border rounded max-w-sm"
                          alt="Preview"
                          required
                        ></img>
                      )}
                    </div>
                    {!isPreview && (
                      <label className="block text-sm font-medium text-red-700">
                        {t("description.diseaseDetection.1")}
                      </label>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t("description.diseaseDetection.2")}
                    </label>
                    <div
                      ref={drop}
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                    >
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="True"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
                          >
                            <span>{t("description.diseaseDetection.3")}</span>
                            <input
                              id="file-upload"
                              onChange={imageUploadHandler}
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                            ></input>
                          </label>
                          <p className="pl-1">
                            {t("description.diseaseDetection.4")}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF {t("description.diseaseDetection.5")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md rounded-b-md text-white bg-emerald-500 hover:bg-emerald-600 font-extrabold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 w-full"
                >
                  <span>
                    {t("description.diseaseDetection.6")} &nbsp;
                    <BsSearch className="inline-block" />{" "}
                  </span>
                </button>
              </div>
            </form>
            {/*<div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
          <p>
            <Trans i18nKey="description.part1">
              Edit <code>src/App.js</code> and save to reload.
            </Trans>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('description.part2')}
          </a>*/}
          </div>
        </div>
      )}
      {successData && (
        <div className="flex flex-col w-11/12 mx-auto mb-6 p-6">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden sm:rounded-lg">
                <button
                  type="submit"
                  className="mb-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  onClick={goBackHandler}
                >
                  {t("description.diseaseDetection.7")} &nbsp;{" "}
                  <IoReloadOutline size={20} />
                </button>
                <table className="min-w-full table-auto">
                  <tbody>
                    <tr className="bg-gray-100 border-b hover:bg-yellow-100">
                      <th
                        scope="col"
                        className="text-sm bg-emerald-500 font-medium text-white px-6 py-4 text-left"
                      >
                        Plant / Crop Name
                      </th>
                      <td className="px-4">
                        {successData.detection.split("__")[0]}
                      </td>
                    </tr>
                    <tr className="bg-gray-100 border-b hover:bg-yellow-100">
                      <th
                        scope="col"
                        className="text-sm bg-emerald-500 font-medium text-white px-6 py-4 text-left"
                      >
                        Scientific Name
                      </th>
                      <td className="px-4">
                        {successData.plant.scientificName}
                      </td>
                    </tr>
                    <tr className="bg-gray-100 border-b hover:bg-yellow-100">
                      <th
                        scope="col"
                        className="text-sm bg-emerald-500 font-medium text-white px-6 py-4 text-left"
                      >
                        Plant Description
                      </th>
                      <td className="px-4">{successData.plant.description}</td>
                    </tr>
                    <tr className="bg-gray-100 border-b hover:bg-yellow-100">
                      <th
                        scope="col"
                        className="text-sm bg-emerald-500 font-medium text-white px-6 py-4 text-left"
                      >
                        Disease Name
                      </th>
                      <td className="px-4">
                        {successData.detection
                          .split("__")[1]
                          .split("_")
                          .join(" ")}
                      </td>
                    </tr>
                    <tr className="bg-gray-100 border-b hover:bg-yellow-100">
                      <th
                        scope="col"
                        className="text-sm bg-emerald-500 font-medium text-white px-6 py-4 text-left"
                      >
                        Symptoms
                      </th>
                      <td className="px-4">{successData.disease.symptoms}</td>
                    </tr>
                    <tr className="bg-gray-100 border-b hover:bg-yellow-100">
                      <th
                        scope="col"
                        className="text-sm bg-emerald-500 font-medium text-white px-6 py-4 text-left"
                      >
                        Trigger
                      </th>
                      <td className="px-4">{successData.disease.trigger}</td>
                    </tr>
                    <tr className="bg-gray-100 border-b hover:bg-yellow-100">
                      <th
                        scope="col"
                        className="text-sm bg-emerald-500 font-medium text-white px-6 py-4 text-left"
                      >
                        Control using organic method
                      </th>
                      <td className="px-4">{successData.disease.organic}</td>
                    </tr>
                    <tr className="bg-gray-100 border-b hover:bg-yellow-100">
                      <th
                        scope="col"
                        className="text-sm bg-emerald-500 font-medium text-white px-6 py-4 text-left"
                      >
                        Control using chemical method
                      </th>
                      <td className="px-4">{successData.disease.chemical}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiseaseDetection;
