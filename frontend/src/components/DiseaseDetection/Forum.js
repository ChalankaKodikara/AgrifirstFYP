import React from "react";
import "./Profile.css";
import Navbar2 from "../Navbar/Navbar2";
import ImageUpload from "./ImageUpload";
import Piechart from "./Piechart"
const Forum = () => {
  return (
    <div>
      <Navbar2/>
      <ImageUpload />
      <Piechart/>
    </div>
  );
};

export default Forum;
