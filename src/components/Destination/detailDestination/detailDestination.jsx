import "./detailDestination.css";
import beach from "../../../assets/img/beach.jpg";
import { useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";

const DetailDestination = () => {
  const location = useLocation();
  const { currentDestination, allDestinations, selectedDay } =
    location.state || {};
  const totalDays = Math.ceil(allDestinations?.length / 3);
  const [activeDay, setActiveDay] = useState(selectedDay || 1);

  useEffect(() => {
    if (selectedDay) {
      setActiveDay(selectedDay);
    }
  }, [selectedDay]);

  const getDaySchedule = () => {
    const schedule = [];

    for (let day = 0; day < totalDays; day++) {
      const dayDestinations = allDestinations?.slice(day * 3, (day + 1) * 3);
      const daySchedule = {
        dayNumber: day + 1,
        title: dayDestinations?.map((dest) => dest.name).join(" - "),
        destinations: dayDestinations?.map((dest, index) => ({
          ...dest,
          session: getSession(index),
        })),
      };
      schedule.push(daySchedule);
    }
    return schedule;
  };

  const getSession = (index) => {
    switch (index) {
      case 0:
        return "Buổi sáng";
      case 1:
        return "Buổi chiều";
      case 2:
        return "Buổi tối";
      default:
        return "";
    }
  };

  const daySchedule = getDaySchedule();
  const filteredDestinations = useMemo(() => {
    const startIndex = (activeDay - 1) * 3;
    const endIndex = startIndex + 3;
    return allDestinations?.slice(startIndex, endIndex).map((dest, index) => ({
      ...dest,
      session: getSession(index),
    }));
  }, [activeDay, allDestinations]);

  return (
    <div className="detail-destination">
      <div className="container">
        <div>
          <h1 className="detail-destination-title">
            Khám phá {currentDestination?.address}
          </h1>
          <p className="detail-destination-description">
            {`Lịch trình ngày ${activeDay}`} tại {currentDestination?.address}.
          </p>
        </div>
        <div className="section">
          <div className="section-left">
            <h2 className="section-left-title">Hành Trình</h2>
            <div className="section-content">
              {daySchedule
                .filter((day) => day.dayNumber === activeDay)
                .map((day) => (
                  <div
                    className={"section-left-item active"}
                    key={day.dayNumber}
                  >
                    <h3 className="section-left-topic">
                      Ngày {day.dayNumber}: {day.title}
                    </h3>
                    <div className="day-schedule">
                      {day.destinations.map((dest) => (
                        <div key={dest._id} className="schedule-item">
                          <div className="schedule-details">
                            <h4 className="schedule-time">{dest.session}:</h4>
                            <p className="schedule-description">
                              {dest.description || "Chưa có mô tả chi tiết"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="section-right">
            <h2 className="section-right-title">Chi Tiết</h2>
            <div className="section-right-content">
              {filteredDestinations?.map((destination) => (
                <div className="section-right-item" key={destination._id}>
                  <h3 className="section-right-topic">
                    {destination.session}: {destination.name}
                  </h3>
                  <div className="section-right-clock">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="section-clock-icon"
                    >
                      <path
                        fill="currentColor"
                        d="M12 20a7 7 0 0 1-7-7a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7m0-16a9 9 0 0 0-9 9a9 9 0 0 0 9 9a9 9 0 0 0 9-9a9 9 0 0 0-9-9m.5 4H11v6l4.75 2.85l.75-1.23l-4-2.37zM7.88 3.39L6.6 1.86L2 5.71l1.29 1.53zM22 5.72l-4.6-3.86l-1.29 1.53l4.6 3.86z"
                      />
                    </svg>
                    <span className="section-clock-open">
                      {destination.open_hours}
                    </span>
                    <span className="section-clock-dash"> - </span>
                    <span className="section-clock-close">
                      {destination.close_hours}
                    </span>
                  </div>
                  <div className="section-right-category">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="section-category-icon"
                    >
                      <path
                        fill="currentColor"
                        d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1M4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4s-4 1.794-4 4s1.794 4 4 4"
                      />
                    </svg>
                    <div className="section-category">
                      <span className="section-category-text">Loại:</span>
                      <span>{destination.category}</span>
                    </div>
                  </div>
                  <div className="section-right-price">
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="26px"
                      height="26px"
                      viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet"
                      className="section-price-icon"
                    >
                      <g
                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#008ae6"
                        stroke="none"
                      >
                        <path
                          d="M3950 4189 c-36 -12 -792 -257 -1680 -546 -1400 -455 -1627 -526
                        -1703 -534 -48 -4 -97 -14 -110 -20 -53 -27 -91 -65 -113 -113 l-24 -51 0
                        -909 c0 -652 3 -919 11 -947 16 -50 61 -105 112 -132 l42 -22 1845 -3 c1313
                        -2 1860 0 1896 8 34 7 66 23 93 46 79 68 75 41 81 582 l5 483 133 44 c74 24
                        148 54 166 66 58 40 96 113 96 186 0 26 -491 1584 -546 1731 -46 125 -165 176
                        -304 131z m129 -156 c16 -14 89 -229 291 -860 149 -463 270 -849 270 -858 0
                        -36 -38 -55 -222 -111 -17 -5 -18 16 -18 353 0 201 -4 373 -10 393 -13 46 -63
                        106 -109 129 l-36 19 -90 299 c-64 211 -99 311 -120 343 -39 58 -106 93 -178
                        92 -63 0 -329 -84 -358 -113 -43 -43 -4 -129 58 -129 15 0 88 20 161 44 74 24
                        142 41 153 39 11 -3 26 -15 34 -27 12 -18 165 -510 165 -529 0 -4 -261 -7
                        -581 -7 l-581 0 -54 49 c-72 66 -143 93 -260 99 l-92 4 -11 39 c-21 69 -89 91
                        -136 44 -27 -26 -31 -57 -15 -100 9 -23 7 -27 -17 -36 -15 -5 -55 -30 -89 -54
                        l-63 -45 -508 1 -508 1 345 113 c190 62 590 193 890 290 300 97 626 203 725
                        235 99 32 333 108 520 169 187 60 351 114 365 120 37 14 55 13 79 -6z m135
                        -1104 l26 -20 0 -900 c0 -886 0 -899 -20 -919 -20 -20 -33 -20 -1854 -20
                        l-1833 0 -27 21 -26 20 0 899 0 899 26 20 27 21 1827 0 1827 0 27 -21z"
                        />
                        <path
                          d="M767 2796 c-57 -21 -103 -61 -128 -113 l-24 -48 0 -630 0 -630 22
                        -41 c25 -47 73 -91 120 -111 23 -9 82 -13 201 -13 156 0 171 2 196 21 32 25
                        35 75 7 110 -19 23 -25 24 -185 27 -165 3 -166 3 -186 29 -20 26 -20 35 -18
                        621 l3 594 24 19 c21 17 40 19 176 19 139 0 155 2 179 21 32 25 35 75 7 110
                        -19 23 -24 24 -188 26 -123 2 -178 -1 -206 -11z"
                        />
                        <path
                          d="M2323 2798 c-24 -12 -41 -47 -45 -97 -3 -31 -7 -35 -58 -51 -79 -24
                        -135 -55 -187 -103 -83 -76 -115 -148 -115 -252 1 -150 117 -283 294 -336 l68
                        -21 0 -214 0 -214 -27 6 c-122 30 -212 118 -213 205 0 36 -28 68 -67 75 -27 5
                        -37 1 -64 -25 -30 -30 -31 -35 -25 -84 10 -75 38 -129 97 -192 59 -62 158
                        -117 244 -135 54 -11 55 -12 55 -45 0 -49 18 -82 52 -96 24 -10 35 -9 63 4 35
                        17 42 32 47 96 3 31 7 35 58 51 126 39 229 120 277 219 39 79 39 181 0 263
                        -48 99 -165 187 -290 219 l-47 11 0 215 0 215 28 -7 c105 -26 195 -101 207
                        -172 11 -64 25 -91 56 -103 67 -28 117 29 104 117 -22 145 -162 275 -337 314
                        l-58 12 0 44 c0 73 -55 111 -117 81z m-43 -498 l0 -199 -47 17 c-61 22 -138
                        95 -151 144 -22 82 22 159 119 207 34 17 66 31 71 31 4 0 8 -90 8 -200z m279
                        -437 c148 -106 100 -276 -96 -337 l-23 -7 0 200 0 200 41 -14 c22 -8 57 -27
                        78 -42z"
                        />
                        <path
                          d="M3585 2799 c-51 -29 -60 -85 -20 -124 24 -24 28 -25 180 -25 152 0
                        156 -1 180 -25 l25 -24 0 -596 c0 -582 0 -595 -20 -615 -18 -18 -33 -20 -170
                        -20 -189 0 -220 -12 -220 -86 0 -14 11 -36 25 -49 24 -25 27 -25 197 -25 146
                        0 179 3 214 19 51 23 108 90 123 144 9 30 11 212 9 657 -3 608 -3 615 -25 655
                        -24 46 -54 75 -103 101 -29 16 -62 19 -205 22 -113 1 -177 -2 -190 -9z"
                        />
                      </g>
                    </svg>
                    <div className="section-price">
                      <span className="section-price-text">
                        Giá: {destination.price?.toLocaleString()}
                      </span>
                      <span className="section-price-unit">đ</span>
                    </div>
                  </div>
                  <div className="section-right-address">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      width="1.3em"
                      height="1.3em"
                      fill="#008ae6"
                      className="section-address-icon"
                    >
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                    <span className="section-address-text">
                      Địa chỉ: {destination.address}
                    </span>
                  </div>
                  <figure className="section-right-figure">
                    <img
                      src={destination.image || beach}
                      alt={destination.name}
                      className="section-right-img"
                    />
                  </figure>
                  <p className="section-right-description">
                    {destination.description || "Chưa có mô tả chi tiết"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="detail-destination-button">
          <a href="" className="btn btn-detail-destination">
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailDestination;
