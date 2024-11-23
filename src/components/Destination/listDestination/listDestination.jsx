import "./listDestination.css";
import mountain from "../../../assets/img/mountain.jpg";
// import beach from "../../../assets/img/beach.jpg";
// import city from "../../../assets/img/CityAdventure.jpg";
import { useLocation, useNavigate } from "react-router-dom";

const ListDestination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planData = location.state?.planData;

  const handleLearnMore = (destination, index, dayIndex) => {
    if (destination) {
      navigate("/detailDestination", {
        state: {
          currentDestination: destination,
          allDestinations: planData.selectedTrips,
          currentIndex: index,
          selectedDay: dayIndex + 1, // Sử dụng dayIndex được truyền vào
        },
      });
    } else {
      console.log("No destination data available");
    }
  };

  const handleDayClick = (dayIndex) => {
    const startIndex = dayIndex * 3;
    const endIndex = startIndex + 3;
    const dayDestinations = planData?.selectedTrips.slice(startIndex, endIndex);

    if (dayDestinations && dayDestinations.length > 0) {
      navigate("/detailDestination", {
        state: {
          currentDestination: dayDestinations[0],
          allDestinations: planData.selectedTrips,
          selectedDay: dayIndex + 1,
        },
      });
    }
  };

  const groupDestinationsByDay = (destinations) => {
    const groups = [];
    if (destinations) {
      for (let i = 0; i < destinations.length; i += 3) {
        groups.push(destinations.slice(i, i + 3));
      }
    }
    return groups;
  };

  const groupedDestinations = groupDestinationsByDay(planData?.selectedTrips);

  return (
    <div className="list-destination-container">
      <div className="container">
        <h1 className="card-title">Khám phá kế hoạch du lịch của chúng tôi</h1>
        {groupedDestinations.map((group, dayIndex) => (
          <div key={dayIndex} className="day-group">
            <h2 className="day-title" onClick={() => handleDayClick(dayIndex)}>
              Ngày {dayIndex + 1}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="arrow-icon"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </h2>
            <div className="card">
              {group.map((destination, index) => (
                <div className="card-item" key={destination._id}>
                  <figure className="card-item-figure">
                    <img
                      className="card-item-img"
                      src={destination.image || mountain}
                      alt={destination.name}
                      onClick={() =>
                        handleLearnMore(destination, index, dayIndex)
                      }
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{destination.name}</h2>
                    <div className="card-body-item">
                      <span>Loại: </span>
                      <span>{destination.category}</span>
                    </div>
                    <div className="card-body-item">
                      <span>Địa điểm: </span>
                      <span>{destination.address}</span>
                    </div>
                    <div className="card-body-item">
                      <span>Giá: </span>
                      <span>{destination.price.toLocaleString()} VNĐ</span>
                    </div>
                    <button
                      className="btn btn-plan-list"
                      type="submit"
                      onClick={() =>
                        handleLearnMore(destination, index, dayIndex)
                      }
                    >
                      Tìm hiểu thêm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDestination;
