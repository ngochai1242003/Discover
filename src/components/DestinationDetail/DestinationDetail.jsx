import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './destinationDetail.css';
import SearchPopupComponent from '../SearchPopupComponent/SearchPopupComponent';
import banner from "../../assets/img/banner2.jpg";
const DestinationDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const fetchDestinationDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/destination/${id}`);
        setDestination(response.data);
      } catch (error) {
        console.error('Error fetching destination details:', error);
      }
    };
    fetchDestinationDetail();
  }, [id]);

  if (!destination) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className="header_img">
          <img className="img" src={banner} alt="" />
          <h1>Từ Đông Nam Á Đến Thế Giới, Trong Tầm Tay Bạn</h1>
          <p>Rong chơi bốn phương, tìm kiếm "yêu thương"</p>
        </div>
    <SearchPopupComponent/>
    
    <div className="container">
      <h2>{destination.name}</h2>
      <img src={destination.img_url} alt={destination.name} />
      <p>{destination.description}</p>
      <ul>
        <li>Khoảng cách: {destination.distance}</li>
        <li>Dịch vụ: {destination.service}</li>
        <li>Giờ mở cửa: {destination.open_hours}</li>
        <li>Đánh giá: {destination.rating}</li>
      </ul>
    </div>
    </>
  );
};

export default DestinationDetail;
