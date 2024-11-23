import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import banner from "../../assets/img/banner2.jpg";
import BannerSlider from "../../components/BannerSlider/bannerSlider";
import SearchPopupComponent from "../../components/SearchPopupComponent/SearchPopupComponent";
import DestinationCard from "../../components/DestinationCard/destinationCard";
import "./home.css";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const listContainerRef = useRef(null);

  // Hàm lấy dữ liệu từ API
  const fetchDestinations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/destination/"
      );
      setDestinations(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
  };

  // Gọi hàm fetch khi component được mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  // Tính toán số lượng thẻ có thể hiển thị
  const updateVisibleItems = () => {
    if (listContainerRef.current) {
      const cardElement = listContainerRef.current.querySelector(".list_card");
      if (cardElement && destinations.length > 0) {
        const containerWidth = listContainerRef.current.offsetWidth;
        const cardWidth = cardElement.offsetWidth;
        setVisibleItems(Math.floor(containerWidth / cardWidth));
      }
    }
  };

  // Cập nhật số lượng thẻ hiển thị khi thay đổi kích thước màn hình
  useEffect(() => {
    // Chỉ gọi updateVisibleItems khi destinations đã được load và có ít nhất một phần tử
    if (destinations.length > 0) {
      updateVisibleItems();
      window.addEventListener("resize", updateVisibleItems);
    }
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, [destinations]);

  const handleNext = () => {
    if (currentIndex < destinations.length - visibleItems) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (listContainerRef.current) {
      const cardElement = listContainerRef.current.querySelector(".list_card");
      if (cardElement) {
        const offset = currentIndex * (cardElement.offsetWidth + 25);
        listContainerRef.current.style.transform = `translateX(-${offset}px)`;
      }
    }
  }, [currentIndex, destinations]);

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

        <div className="main_card">
          <div className="card_list" ref={listContainerRef}>
            <DestinationCard destinations={destinations} />
          </div>
          <div className="buttons1">
            <button
              className="previous"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              &lt;
            </button>
            <button
              className="next"
              onClick={handleNext}
              disabled={currentIndex >= destinations.length - visibleItems}
            >
              &gt;
            </button>
          </div>
        </div>

        <div class="main_title1">
          <h1 id="anuong">Ăn uống thả ga</h1>
          <a href="#">Xem thêm</a>
        </div>

        

      </div>
    </div>
  );
};

export default Home;
