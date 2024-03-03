import React from "react";


const CarItem = (props) => {
  const { category, type, rentPrice, imgUrl, carName, groupSize } = props.item;
  return (
    <div className="park_item">
 <a href="../users/user" className={props.clicked === "user" ? "selected" : ""} >
  {" "} Admin 
      </a>  

      <div className="park_item-top">
        <div className="park_item-tile">
          <h3>{carName}</h3>
          <span>
            <i class="ri-heart-line"></i>
          </span>
        </div>
        <p>{category}</p>
      </div>

      <div className="car__img">
        <img src={imgUrl} alt="" />
      </div>

      <div className="park_item-bottom">
        <div className="car__bottom-left">
          <p>
            <i class="ri-user-line"></i> {groupSize}
          </p>
          <p>
            <i class="ri-repeat-line"></i>
            {type}
          </p>
        </div>

        <p className="car__rent">rs.{rentPrice}h</p>
      </div>
    </div>
  );
};

export default CarItem;
