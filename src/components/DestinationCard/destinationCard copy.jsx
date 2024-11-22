import React from "react";
import "./destinationCard.css";
import { useNavigate } from "react-router-dom";


const DestinationCard = ({ destinations }) => {
  if (!Array.isArray(destinations) || destinations.length === 0) {
    return <p>Không có địa điểm nào để hiển thị</p>;
  }

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/destination-detail/${id}`);
  };

  return (
    <>
      {destinations.map((destination, index) => (
        <div className="list_card" key={index}>
          <a key={destination._id}
          className="card"
          onClick={() => handleCardClick(destination._id)}>
            <div className="card_img">
              <img src={destination.img_url} alt={destination.name} />

            </div>
            <div className="card_content">
              <h3>{destination.name}</h3>
              <div className="location">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.11459 10.4167C9.11459 9.5188 9.47127 8.6577 10.1062 8.02282C10.741 7.38793 11.6021 7.03125 12.5 7.03125C13.3979 7.03125 14.259 7.38793 14.8939 8.02282C15.5287 8.6577 15.8854 9.5188 15.8854 10.4167C15.8854 11.3145 15.5287 12.1756 14.8939 12.8105C14.259 13.4454 13.3979 13.8021 12.5 13.8021C11.6021 13.8021 10.741 13.4454 10.1062 12.8105C9.47127 12.1756 9.11459 11.3145 9.11459 10.4167Z"
                    fill="#2067DA"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.93124 9.24687C4.1045 7.15287 5.05855 5.20049 6.60412 3.77707C8.14968 2.35365 10.1738 1.56318 12.275 1.5625H12.725C14.8261 1.56318 16.8503 2.35365 18.3959 3.77707C19.9414 5.20049 20.8955 7.15287 21.0687 9.24687C21.261 11.5848 20.5392 13.9062 19.0552 15.7229L14.0625 21.8292C13.8733 22.0608 13.6349 22.2474 13.3647 22.3756C13.0944 22.5038 12.7991 22.5703 12.5 22.5703C12.2009 22.5703 11.9055 22.5038 11.6353 22.3756C11.3651 22.2474 11.1267 22.0608 10.9375 21.8292L5.94582 15.7229C4.4614 13.9064 3.73925 11.5849 3.93124 9.24687ZM12.5 5.46875C11.1877 5.46875 9.92919 5.99005 9.00128 6.91796C8.07337 7.84588 7.55207 9.1044 7.55207 10.4167C7.55207 11.7289 8.07337 12.9875 9.00128 13.9154C9.92919 14.8433 11.1877 15.3646 12.5 15.3646C13.8123 15.3646 15.0708 14.8433 15.9987 13.9154C16.9266 12.9875 17.4479 11.7289 17.4479 10.4167C17.4479 9.1044 16.9266 7.84588 15.9987 6.91796C15.0708 5.99005 13.8123 5.46875 12.5 5.46875Z"
                    fill="#2067DA"
                  />
                </svg>

                <p>{destination.location}</p>
              </div>
              <div className="card_info">
                <li>{destination.distance}</li>
                <li>{destination.service}</li>
                <li>{destination.open_hours} - {destination.close_hours} </li>
              </div>
              <div className="price">
                <p>{`VND ${destination.price.toLocaleString()}`}</p>
                <div className="assess">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.9135 14.2682L13.2364 16.8828C14.0281 17.362 14.9968 16.6536 14.7885 15.7578L13.6427 10.8411L17.4656 7.52865C18.1635 6.92448 17.7885 5.77865 16.8718 5.70573L11.8406 5.27865L9.87183 0.632812C9.51766 -0.210937 8.30933 -0.210937 7.95516 0.632812L5.98641 5.26823L0.955164 5.69531C0.0384974 5.76823 -0.336503 6.91406 0.361414 7.51823L4.18433 10.8307L3.0385 15.7474C2.83016 16.6432 3.79891 17.3516 4.59058 16.8724L8.9135 14.2682Z"
                      fill="#FFD233"
                    />
                  </svg>

                  <span>{destination.rating}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};

export default DestinationCard;
