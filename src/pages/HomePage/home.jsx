import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import banner from "../../assets/img/banner2.jpg";
import BannerSlider from "../../components/BannerSlider/bannerSlider";
import SearchPopupComponent from "../../components/SearchPopupComponent/SearchPopupComponent";
import DestinationCard from "../../components/DestinationCard/destinationCard";
import "./home.css";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [hotelDestinations, setHotelDestinations] = useState([]);
  const [foodDestinations, setFoodDestinations] = useState([]);

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [visibleItems, setVisibleItems] = useState(1);
  // const listContainerRef = useRef(null);

  const [hotelCurrentIndex, setHotelCurrentIndex] = useState(0);
const [foodCurrentIndex, setFoodCurrentIndex] = useState(0);
const [hotelVisibleItems, setHotelVisibleItems] = useState(1);
const [foodVisibleItems, setFoodVisibleItems] = useState(1);
const hotelListRef = useRef(null);
const foodListRef = useRef(null);

  // Hàm lấy dữ liệu từ API
  const fetchDestinationsByType = async (type, setFunction) => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/destination/", {
        params: { type }
      });
      console.log(`Dữ liệu nhận được từ API cho type ${type}:`, response.data);
      
      const data = Array.isArray(response.data) ? response.data : [];
      setFunction(data);
    } catch (error) {
      console.error(`Lỗi khi lấy dữ liệu cho type ${type}:`, error);
      setFunction([]);
    }
  };

  useEffect(() => {
    fetchDestinationsByType("Hotel", setHotelDestinations);
    fetchDestinationsByType("Food", setFoodDestinations);
  }, []);

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
  
  useEffect(() => {
    updateVisibleItems(hotelListRef, setHotelVisibleItems, hotelDestinations);
    updateVisibleItems(foodListRef, setFoodVisibleItems, foodDestinations);
    window.addEventListener("resize", () => {
      updateVisibleItems(hotelListRef, setHotelVisibleItems, hotelDestinations);
      updateVisibleItems(foodListRef, setFoodVisibleItems, foodDestinations);
    });
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, [hotelDestinations, foodDestinations]);

  const handleHotelNext = () => {
    if (hotelCurrentIndex < hotelDestinations.length - hotelVisibleItems) {
      setHotelCurrentIndex(hotelCurrentIndex + 1);
    }
  };
  
  const handleHotelPrev = () => {
    if (hotelCurrentIndex > 0) {
      setHotelCurrentIndex(hotelCurrentIndex - 1);
    }
  };
  
  const handleFoodNext = () => {
    if (foodCurrentIndex < foodDestinations.length - foodVisibleItems) {
      setFoodCurrentIndex(foodCurrentIndex + 1);
    }
  };
  
  const handleFoodPrev = () => {
    if (foodCurrentIndex > 0) {
      setFoodCurrentIndex(foodCurrentIndex - 1);
    }
  };

  useEffect(() => {
    if (hotelListRef.current) {
      const cardElement = hotelListRef.current.querySelector(".list_card");
      if (cardElement) {
        const offset = hotelCurrentIndex * (cardElement.offsetWidth + 25);
        hotelListRef.current.style.transform = `translateX(-${offset}px)`;
      }
    }
  }, [hotelCurrentIndex, hotelDestinations]);
  
  useEffect(() => {
    if (foodListRef.current) {
      const cardElement = foodListRef.current.querySelector(".list_card");
      if (cardElement) {
        const offset = foodCurrentIndex * (cardElement.offsetWidth + 25);
        foodListRef.current.style.transform = `translateX(-${offset}px)`;
      }
    }
  }, [foodCurrentIndex, foodDestinations]);

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
              disabled={hotelCurrentIndex  === 0}
            >
              &lt;
            </button>
            <button
              className="next"
              onClick={handleHotelNext}
              disabled={hotelCurrentIndex  >= hotelDestinations.length - hotelVisibleItems}
            >
              &gt;
            </button>
          </div>
        </div>

        <div class="main_title1">
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
              disabled={foodCurrentIndex  === 0}
            >
              &lt;
            </button>
            <button
              className="next"
              onClick={handleFoodNext}
              disabled={foodCurrentIndex  >= foodDestinations.length - foodVisibleItems}
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
