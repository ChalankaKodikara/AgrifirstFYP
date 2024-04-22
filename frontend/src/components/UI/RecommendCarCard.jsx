import React from "react";

const RecommendCarCard = (props) => {
  const { carName, retweet, imgUrl, rentPrice, percentage } = props.item;
  return (
    <div className="recommend__car-card">
      <div className="recommend__car-top">
        <h5>
          <span>
            <i class="ri-refresh-line"></i>
          </span>
          {percentage} percentage % 
        </h5>
      </div>

      <div className="recommend__car-img">
        <img src={imgUrl} alt="" />
      </div>
      <div className="recommend__car-bottom">
        <h4>{carName}</h4>
        <div className="recommend__car-other">
          <div className="recommend__icons">
            <p>
              <i class="ri-repeat-line"></i>
              {retweet}
            </p>
            <p>
              <i class="ri-settings-2-line"></i>
            </p>
            <p>
              <i class="ri-timer-flash-line"></i>
            </p>
          </div>
          <span>rs.{rentPrice}/h</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendCarCard;
