import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./destinationDetail.css";
import SearchPopupComponent from "../SearchPopupComponent/SearchPopupComponent";
import banner from "../../assets/img/banner2.jpg";
import Lightbox from "../Lightbox/Lightbox";
import "../Lightbox/Lightbox.css";
import { Link } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const DestinationDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [destination, setDestination] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // State để điều khiển mở rộng

  useEffect(() => {
    const fetchDestinationDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/destination/${id}`
        );
        setDestination(response.data);
      } catch (error) {
        console.error("Error fetching destination details:", error);
      }
    };
    fetchDestinationDetail();
  }, [id]);

  if (!destination) {
    return <p>Loading...</p>;
  }

  const { name, lat, lng, description, price } = destination;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="header_img">
        <img className="img" src={banner} alt="" />
        <h1>Từ Đông Nam Á Đến Thế Giới, Trong Tầm Tay Bạn</h1>
        <p>Rong chơi bốn phương, tìm kiếm "yêu thương"</p>
      </div>
      <SearchPopupComponent />

      <div className="container">
        <div className="title_linkPage">
          <Link to="/">Home</Link>
          <span>&gt;</span>
          <a style={{textDecoration: "underline"}}>{name}</a>
        </div>

        <section className="info_destination_detail">
          <h1 className="info_destination_detail_name">{name}</h1>
          <div className="rating_wishlist">
            <div className="rating_wishlist_left">
              <span>4.6 / 5</span>
              <img src="./assets/icon/star.svg" alt="" />
            </div>
            <div className="rating_wishlist_right">
              <div className="wishlist_right">
                <img src="./assets/icon/ph_heart-bold.svg" alt="" />
                <a style={{ textDecoration: "underline" }} href="">
                  Wishlist
                </a>
              </div>
              <div className="share_right">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.293 2.29303C11.4805 2.10556 11.7348 2.00024 12 2.00024C12.2652 2.00024 12.5195 2.10556 12.707 2.29303L15.707 5.29303C15.8892 5.48163 15.99 5.73424 15.9877 5.99643C15.9854 6.25863 15.8802 6.50944 15.6948 6.69485C15.5094 6.88026 15.2586 6.98543 14.9964 6.9877C14.7342 6.98998 14.4816 6.88919 14.293 6.70703L13 5.41403V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8947 12.2652 16 12 16C11.7348 16 11.4804 15.8947 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V5.41403L9.707 6.70703C9.5184 6.88919 9.2658 6.98998 9.0036 6.9877C8.7414 6.98543 8.49059 6.88026 8.30518 6.69485C8.11977 6.50944 8.0146 6.25863 8.01233 5.99643C8.01005 5.73424 8.11084 5.48163 8.293 5.29303L11.293 2.29303ZM4 11C4 10.4696 4.21071 9.96089 4.58579 9.58582C4.96086 9.21074 5.46957 9.00003 6 9.00003H8C8.26522 9.00003 8.51957 9.10539 8.70711 9.29292C8.89464 9.48046 9 9.73481 9 10C9 10.2652 8.89464 10.5196 8.70711 10.7071C8.51957 10.8947 8.26522 11 8 11H6V20H18V11H16C15.7348 11 15.4804 10.8947 15.2929 10.7071C15.1054 10.5196 15 10.2652 15 10C15 9.73481 15.1054 9.48046 15.2929 9.29292C15.4804 9.10539 15.7348 9.00003 16 9.00003H18C18.5304 9.00003 19.0391 9.21074 19.4142 9.58582C19.7893 9.96089 20 10.4696 20 11V20C20 20.5305 19.7893 21.0392 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0392 4 20.5305 4 20V11Z"
                    fill="#1E1E1E"
                  />
                </svg>
                <a
                  style={{ textDecoration: "underline", marginTop: "4px" }}
                  href=""
                >
                  Share
                </a>
              </div>
            </div>
          </div>
        </section>

        <Lightbox images={destination.image_url} />

        {/* Phần mô tả có nút mở rộng */}
        <section className="description_detail">
          <div className="description">
            <div
              className={`description-container ${
                isExpanded ? "expanded" : ""
              }`}
            >
              <p style={{ whiteSpace: "pre-line" }}>{description}</p>
            </div>

            <button onClick={toggleExpand}>
              {isExpanded ? "Thu gọn" : "Xem thêm"}
            </button>
          </div>

          <div className="price-card">
            <div className="price-card-header">
              <span>Save up to 5%</span>
            </div>
            <div className="price-card-content">
              <div className="price-card-content-wrapper">
                <p>
                  From <span className="price-original">₫1,685,000</span>
                </p>
                <h2 className="price-discount">
                  {destination.price.toLocaleString()}₫
                </h2>
                <p className="price-unit">per person</p>
              </div>
              <button className="btn-check-availability">
                Check availability
              </button>
            </div>
          </div>
        </section>

        <section className="about_activity">
          <h2 className="section-title">About this activity</h2>
          <ul className="activity-list">
            <li>
              <div className="icon-container">🗺️</div>
              <div className="activity-content">
                <h3>Địa điểm</h3>
                <p>{destination.location}</p>
              </div>
            </li>
            
            <li>
              <div className="icon-container">📍</div>
              <div className="activity-content">
                <h3>VỊ trí</h3>
                <p>{destination.place}</p>
              </div>
            </li>
            <li>
              <div className="icon-container">⏰</div>
              <div className="activity-content">
                <h3>Thời gian mở - đóng</h3>
                <p>{destination.open_hours}</p>
              </div>
            </li>
            <li>
              <div className="icon-container">👨‍✈️</div>
              <div className="activity-content">
                <h3>Dịch vụ</h3>
                <p>{destination.service}</p>
              </div>
            </li>
            <li>
              <div className="icon-container">🚍</div>
              <div className="activity-content">
                <h3>Khoảng cách</h3>
                <p>{destination.distance}</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Thêm bản đồ hiển thị vị trí */}
        <section className="map_section">
          <h2 className="section-title">Location</h2>
          <MapContainer
            center={[lat, lng]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lng]}>
              <Popup>{name}</Popup>
            </Marker>
          </MapContainer>
        </section>

        <section className="reviews-section">
  <h2 className="section-title">Reviews from other travelers</h2>
  <div className="reviews-container">
    <div className="review-card">
      <div className="review-header">
        <span className="avatar">J</span>
        <div>
          <p className="reviewer">Juhi — India</p>
          <p className="review-date">November 17, 2024</p>
        </div>
      </div>
      <div className="review-stars">⭐⭐⭐⭐⭐</div>
      <p className="review-content">
        It was a great full day tour. Dao our tour guide managed everything
        really well. Would definitely recommend taking this full day tour to
        visit the golden bridge and bana hills. It was totally worth it.
      </p>
    </div>
    <div className="review-card">
      <div className="review-header">
        <span className="avatar">N</span>
        <div>
          <p className="reviewer">Nick — United States</p>
          <p className="review-date">November 19, 2024</p>
        </div>
      </div>
      <div className="review-stars">⭐⭐⭐⭐⭐</div>
      <p className="review-content">
        Dao was a great guide!! She was very informative and proactive in
        ensuring that everyone enjoyed the trip.
      </p>
    </div>
  </div>
  <a href="#" className="see-more-reviews">
    See more reviews
  </a>
</section>

      </div>
    </>
  );
};

export default DestinationDetail;
