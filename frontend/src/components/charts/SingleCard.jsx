import React from "react";

const SingleCard = (props) => {
  const { title, totalNumber, icon } = props.item;
  return (
    <div className="single__card" style={{ color: "#fff", fontSize: "25px" }}>
  <div className="card__content">
    <h3 style={{ color: "#fff" }}>{title}</h3> {/* Font color set to white */}
    <span style={{ color: "#fff", fontSize: "20px" }}>{totalNumber}+</span> {/* Font color set to white and font size increased */}
  </div>

  <span className="card__icon">
    <i className={icon}></i>
  </span>
</div>

  );
};

export default SingleCard;
