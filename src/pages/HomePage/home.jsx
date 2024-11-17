import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import banner from "../../assets/img/banner2.jpg";
import BannerSlider from "../../components/BannerSlider/bannerSlider";
import SearchPopupComponent from "../../components/SearchPopupComponent/SearchPopupComponent";
import DestinationCard from "../../components/DestinationCard/destinationCard";
import "./home.css";

const Home = () => {
  //useState_Destinations
  const [hotelDestinations, setHotelDestinations] = useState([]);
  const [foodDestinations, setFoodDestinations] = useState([]);
  const [activityDestinations, setActivityDestinations] = useState([]);
  const [sightseeingDestinations, setSightseeingDestinations] = useState([]);

  //useState_CurrentIndex
  const [hotelCurrentIndex, setHotelCurrentIndex] = useState(0);
  const [foodCurrentIndex, setFoodCurrentIndex] = useState(0);
  const [activityCurrentIndex, setActivityCurrentIndex] = useState(0);
  const [sightseeingCurrentIndex, setSightseeingCurrentIndex] = useState(0);

  //useState_VisibleItems
  const [hotelVisibleItems, setHotelVisibleItems] = useState(1);
  const [foodVisibleItems, setFoodVisibleItems] = useState(1);
  const [activityVisibleItems, setActivityVisibleItems] = useState(1);
  const [sightseeingVisibleItems, setSightseeingVisibleItems] = useState(1);

  //useRef_ListRef
  const hotelListRef = useRef(null);
  const foodListRef = useRef(null);
  const activityListRef = useRef(null);
  const sightseeingListRef = useRef(null);

  // Hàm lấy dữ liệu từ API
  const fetchDestinationsByType = async (type, setFunction) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/destination/",
        {
          params: { type },
        }
      );
      console.log(`Dữ liệu nhận được từ API cho type ${type}:`, response.data);

      const data = Array.isArray(response.data) ? response.data : [];
      setFunction(data);
    } catch (error) {
      console.error(`Lỗi khi lấy dữ liệu cho type ${type}:`, error);
      setFunction([]);
    }
  };

  //useEffect_fetchDestinationsByType
  useEffect(() => {
    fetchDestinationsByType("Hotel", setHotelDestinations);
    fetchDestinationsByType("Food", setFoodDestinations);
    fetchDestinationsByType("Activity", setActivityDestinations);
    fetchDestinationsByType("Sightseeing", setSightseeingDestinations);
  }, []);

  //updateVisibleItems
  const updateVisibleItems = (listRef, setVisibleItems, destinations) => {
    if (listRef.current) {
      const cardElement = listRef.current.querySelector(".list_card");
      if (cardElement && destinations.length > 0) {
        const containerWidth = listRef.current.offsetWidth;
        const cardWidth = cardElement.offsetWidth;
        setVisibleItems(Math.floor(containerWidth / cardWidth));
      }
    }
  };

  //useEffect_updateVisibleItems
  useEffect(() => {
    updateVisibleItems(hotelListRef, setHotelVisibleItems, hotelDestinations);
    updateVisibleItems(foodListRef, setFoodVisibleItems, foodDestinations);
    updateVisibleItems(activityListRef, setActivityVisibleItems, activityDestinations);
    updateVisibleItems(sightseeingListRef, setSightseeingVisibleItems, sightseeingDestinations);

    window.addEventListener("resize", () => {
      updateVisibleItems(hotelListRef, setHotelVisibleItems, hotelDestinations);
      updateVisibleItems(foodListRef, setFoodVisibleItems, foodDestinations);
      updateVisibleItems(activityListRef, setActivityVisibleItems, activityDestinations);
      updateVisibleItems(sightseeingListRef, setSightseeingVisibleItems, sightseeingDestinations);
    });

    return () => window.removeEventListener("resize", updateVisibleItems);
  }, [
    hotelDestinations,
    foodDestinations,
    activityDestinations,
    sightseeingDestinations,
  ]);

  //handleHotelNext
  const handleHotelNext = () => {
    if (hotelCurrentIndex < hotelDestinations.length - hotelVisibleItems) {
      setHotelCurrentIndex(hotelCurrentIndex + 1);
    }
  };
  //handleHotelPrev
  const handleHotelPrev = () => {
    if (hotelCurrentIndex > 0) {
      setHotelCurrentIndex(hotelCurrentIndex - 1);
    }
  };

  //handleFoodNext
  const handleFoodNext = () => {
    if (foodCurrentIndex < foodDestinations.length - foodVisibleItems) {
      setFoodCurrentIndex(foodCurrentIndex + 1);
    }
  };
  //handleFoodPrev
  const handleFoodPrev = () => {
    if (foodCurrentIndex > 0) {
      setFoodCurrentIndex(foodCurrentIndex - 1);
    }
  };

  //handleActivityNext
  const handleActivityNext = () => {
    if (
      activityCurrentIndex <
      activityDestinations.length - activityVisibleItems
    ) {
      setActivityCurrentIndex(activityCurrentIndex + 1);
    }
  };
  //handleActivityPrev
  const handleActivityPrev = () => {
    if (activityCurrentIndex > 0) {
      setActivityCurrentIndex(activityCurrentIndex - 1);
    }
  };
  
  //handleSightseeingNext
  const handleSightseeingNext = () => {
    if (
      sightseeingCurrentIndex <
      sightseeingDestinations.length - sightseeingVisibleItems
    ) {
      setSightseeingCurrentIndex(sightseeingCurrentIndex + 1);
    }
  };
  //handleSightseeingPrev
  const handleSightseeingPrev = () => {
    if (sightseeingCurrentIndex > 0) {
      setSightseeingCurrentIndex(sightseeingCurrentIndex - 1);
    }
  };

  //hotelListRef
  useEffect(() => {
    if (hotelListRef.current) {
      const cardElement = hotelListRef.current.querySelector(".list_card");
      if (cardElement) {
        const offset = hotelCurrentIndex * (cardElement.offsetWidth + 25);
        hotelListRef.current.style.transform = `translateX(-${offset}px)`;
      }
    }
  }, [hotelCurrentIndex, hotelDestinations]);

  //foodListRef
  useEffect(() => {
    if (foodListRef.current) {
      const cardElement = foodListRef.current.querySelector(".list_card");
      if (cardElement) {
        const offset = foodCurrentIndex * (cardElement.offsetWidth + 25);
        foodListRef.current.style.transform = `translateX(-${offset}px)`;
      }
    }
  }, [foodCurrentIndex, foodDestinations]);

  //activityListRef
  useEffect(() => {
    if (activityListRef.current) {
      const cardElement = activityListRef.current.querySelector(".list_card");
      if (cardElement) {
        const offset = activityCurrentIndex * (cardElement.offsetWidth + 25);
        activityListRef.current.style.transform = `translateX(-${offset}px)`;
      }
    }
  }, [activityCurrentIndex, activityDestinations]);

  //sightseeingListRef
  useEffect(() => {
    if (sightseeingListRef.current) {
      const cardElement =
        sightseeingListRef.current.querySelector(".list_card");
      if (cardElement) {
        const offset = sightseeingCurrentIndex * (cardElement.offsetWidth + 25);
        sightseeingListRef.current.style.transform = `translateX(-${offset}px)`;
      }
    }
  }, [sightseeingCurrentIndex, sightseeingDestinations]);

  return (
    <div>
      <main>
        <div className="header_img">
          <img className="img" src={banner} alt="" />
          <h1>Từ Đông Nam Á Đến Thế Giới, Trong Tầm Tay Bạn</h1>
          <p>Rong chơi bốn phương, tìm kiếm "yêu thương"</p>
        </div>
        <SearchPopupComponent />
      </main>
      <BannerSlider />
      <div className="container">
        <div className="main_title1">
          <h1 id="khachsan">Lưu trú tại các chỗ nghỉ độc đáo hàng đầu</h1>
          <a href="#">Xem thêm</a>
        </div>
        {/* Khach san */}
        <div className="main_card">
          <div className="card_list" ref={hotelListRef}>
            <DestinationCard destinations={hotelDestinations} />
          </div>
          <div className="buttons1">
            <button
              className="previous"
              onClick={handleHotelPrev}
              disabled={hotelCurrentIndex === 0}
            >
              &lt;
            </button>
            <button
              className="next"
              onClick={handleHotelNext}
              disabled={
                hotelCurrentIndex >=
                hotelDestinations.length - hotelVisibleItems
              }
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="main_title1">
          <h1 id="anuong">Ăn uống thả ga</h1>
          <a href="#">Xem thêm</a>
        </div>
        {/* an uong */}
        <div className="main_card">
          <div className="card_list" ref={foodListRef}>
            <DestinationCard destinations={foodDestinations} />
          </div>
          <div className="buttons1">
            <button
              className="previous"
              onClick={handleFoodPrev}
              disabled={foodCurrentIndex === 0}
            >
              &lt;
            </button>
            <button
              className="next"
              onClick={handleFoodNext}
              disabled={
                foodCurrentIndex >= foodDestinations.length - foodVisibleItems
              }
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="main_title1">
          <h1 id="hoatdong">Hoạt động du lịch</h1>
          <a href="#">Xem thêm</a>
        </div>
        {/* hoạt động */}
        <div className="main_card">
          <div className="card_list" ref={activityListRef}>
            <DestinationCard destinations={activityDestinations} />
          </div>
          <div className="buttons1">
            <button
              className="previous"
              onClick={handleActivityPrev}
              disabled={activityCurrentIndex === 0}
            >
              &lt;
            </button>
            <button
              className="next"
              onClick={handleActivityNext}
              disabled={
                activityCurrentIndex >=
                activityDestinations.length - activityVisibleItems
              }
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="main_title1">
          <h1 id="thamquan">Khám phá muôn nơi Văn hóa & Lịch sử</h1>
          <a href="#">Xem thêm</a>
        </div>
        {/* Tham quan */}
        <div className="main_card">
          <div className="card_list" ref={sightseeingListRef}>
            <DestinationCard destinations={sightseeingDestinations} />
          </div>
          <div className="buttons1">
            <button
              className="previous"
              onClick={handleSightseeingPrev}
              disabled={sightseeingCurrentIndex === 0}
            >
              &lt;
            </button>
            <button
              className="next"
              onClick={handleSightseeingNext}
              disabled={
                sightseeingCurrentIndex >=
                sightseeingDestinations.length - sightseeingVisibleItems
              }
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
