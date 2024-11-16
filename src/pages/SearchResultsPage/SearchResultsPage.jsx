import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchPopupComponent from "../../components/SearchPopupComponent/SearchPopupComponent";
import banner from "../../assets/img/banner2.jpg";
import DestinationCard from "../../components/DestinationCard/destinationCard";
import "../../components/DestinationCard/destinationCard.css";

const SearchResultsPage = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/filters/search`,
          {
            params: { q: query, page: 1, limit: 10 },
          }
        );
        setResults(response.data.docs || []);
      } catch (err) {
        setError("Có lỗi xảy ra khi tìm kiếm.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <>
      <div className="header_img">
        <img className="img" src={banner} alt="" />
        <h1>Từ Đông Nam Á Đến Thế Giới, Trong Tầm Tay Bạn</h1>
        <p>Rong chơi bốn phương, tìm kiếm "yêu thương"</p>
      </div>
      <SearchPopupComponent />
      <h1>Kết quả tìm kiếm cho "{query}"</h1>
      {error && <p>{error}</p>}
      <div className="container">
      {results.length > 0 ? (
          <div className="card_list card_list1">
            <DestinationCard destinations={results} />
          </div>
        ) : (
          <p>Không tìm thấy kết quả nào.</p>
        )}
      </div>

    </>
  );
};

export default SearchResultsPage;
