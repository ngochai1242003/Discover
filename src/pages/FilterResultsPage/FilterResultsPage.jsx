import React from "react";
import { useLocation } from "react-router-dom";
import DestinationCard from "../../components/DestinationCard/destinationCard";
import "../../components/DestinationCard/destinationCard.css";
import SearchPopupComponent from "../../components/SearchPopupComponent/SearchPopupComponent";
import banner from "../../assets/img/banner2.jpg";

const FilterResultsPage = () => {
  const location = useLocation();
  const data = location.state?.data || [];
  const selectedFilters = location.state?.selectedFilters || []; // Lấy các tiêu chí đã chọn từ state

  return (
    <>
    <div className="header_img">
        <img className="img" src={banner} alt="" />
        <h1>Từ Đông Nam Á Đến Thế Giới, Trong Tầm Tay Bạn</h1>
        <p>Rong chơi bốn phương, tìm kiếm "yêu thương"</p>
      </div>
      <SearchPopupComponent/>    
      <div className="container">
      {data.length > 0 ? (
        <div className="card_list card_list1">
          <DestinationCard destinations={data} />
        </div>
      ) : (
        <p>Không có kết quả phù hợp</p>
      )}
      </div>
    </>
  );
};

export default FilterResultsPage;