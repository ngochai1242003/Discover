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

  const { name, location, lat, lng, img_url } = destination;

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
          <a href="">{destination.name}</a>
        </div>

        <section className="info_destination_detail">
          <h1 className="info_destination_detail_name">{destination.name}</h1>
          <div className="rating_wishlist">
            <div className="rating_wishlist_left">
              <span>4.6 / 5</span>
              <img src="./assets/icon/star.svg" alt="" />
            </div>
            <div className="rating_wishlist_right">
              <div className="wishlist_right">
                <img src="./assets/icon/ph_heart-bold.svg" alt="" />
                <p>Wishlist</p>
              </div>
              <div className="share_right">
                <img src="./assets/icon/ph_heart-bold.svg" alt="" />
                <p>Share</p>
              </div>
            </div>
          </div>
        </section>

        <Lightbox images={destination.img_url} />

        <p>{destination.description}</p>

        {/* Thêm bản đồ hiển thị vị trí */}
        <section className="map_section">
          <h2>Location</h2>
          <MapContainer
            center={[lat, lng]}
            zoom={13}
            style={{ height: "400px", width: "100%"}}
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
      </div>
    </>
  );
};

export default DestinationDetail;
