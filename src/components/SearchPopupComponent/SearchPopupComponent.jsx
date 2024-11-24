import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPopupComponent.css";
import closeIcon from "../../assets/icon/close.svg";
import axios from "axios";

const SearchPopupComponent = () => {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState({});

  const openPopup = () => {
    setIsPopupActive(true);
  };

  const closePopup = () => {
    setIsPopupActive(false);
  };

  const toggleSubMenu = (index) => {
    setActiveDropdown((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  // Search
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search-results?q=${query}`);
    }
  };

  //filters
  const [filters, setFilters] = useState({
    location: [],
    service: [],
    category: [],
    rating: [],
    minPrice: "",
    maxPrice: "",
  });

  const handleCheckboxChange = (e, category) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedCategory = checked
        ? [...prevFilters[category], name]
        : prevFilters[category].filter((item) => item !== name);
      return { ...prevFilters, [category]: updatedCategory };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/filters/filter",
        filters
      );
      if (response.data.type === "success") {
        const selectedFilters = [];
      if (filters.category.length > 0) selectedFilters.push(`Category: ${filters.category.join(", ")}`);
      if (filters.minPrice || filters.maxPrice) selectedFilters.push(`Price Range: ${filters.minPrice} - ${filters.maxPrice}`);
      if (filters.service.length > 0) selectedFilters.push(`Service: ${filters.service.join(", ")}`);
      if (filters.rating.length > 0) selectedFilters.push(`Rating: ${filters.rating.join(", ")}`);
      if (filters.location.length > 0) selectedFilters.push(`Location: ${filters.location.join(", ")}`);
        navigate("/filter-results", { state: { data: response.data.docs, selectedFilters  } });
        closePopup();
      }
    } catch (error) {
      console.error("Lỗi khi lọc dữ liệu:", error);
    }
  };

  return (
    <main>
      <div className="search">
        <button className="button" onClick={openPopup}>
          <svg
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.125 1.6875C0.125 1.2731 0.28962 0.875671 0.582646 0.582646C0.875671 0.28962 1.2731 0.125 1.6875 0.125H17.3125C17.7269 0.125 18.1243 0.28962 18.4174 0.582646C18.7104 0.875671 18.875 1.2731 18.875 1.6875V3.86042C18.8749 4.41291 18.6553 4.94272 18.2646 5.33333L12.625 10.9729V18.7062C12.625 18.9016 12.5751 19.0937 12.48 19.2643C12.3849 19.4349 12.2478 19.5784 12.0816 19.6811C11.9154 19.7838 11.7258 19.8423 11.5307 19.8511C11.3355 19.8599 11.1414 19.8186 10.9667 19.7312L7.09479 17.7958C6.87851 17.6877 6.69661 17.5215 6.56948 17.3158C6.44235 17.1101 6.37501 16.8731 6.375 16.6313V10.9729L0.735417 5.33333C0.344689 4.94272 0.125118 4.41291 0.125 3.86042V1.6875Z"
              fill="#414141"
            />
          </svg>
          <p>Lọc</p>
        </button>
        <br />
        <div className="search_detail">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.875 21.875L17.351 17.351M17.351 17.351C18.1249 16.5772 18.7387 15.6585 19.1575 14.6474C19.5763 13.6363 19.7919 12.5527 19.7919 11.4583C19.7919 10.3639 19.5763 9.28027 19.1575 8.26919C18.7387 7.25812 18.1249 6.33944 17.351 5.5656C16.5772 4.79175 15.6585 4.17791 14.6474 3.75911C13.6363 3.34031 12.5527 3.12476 11.4583 3.12476C10.3639 3.12476 9.28027 3.34031 8.26919 3.75911C7.25812 4.17791 6.33944 4.79175 5.5656 5.5656C4.00275 7.12844 3.12476 9.24811 3.12476 11.4583C3.12476 13.6685 4.00275 15.7882 5.5656 17.351C7.12844 18.9139 9.24811 19.7919 11.4583 19.7919C13.6685 19.7919 15.7882 18.9139 17.351 17.351Z"
              stroke="#414141"
              stroke-width="2.08333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm địa điểm du lịch..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="search_menu">
          <ul>
            <li>
              <svg
                className="icon"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.125 7.29165V18.75C3.125 20.7146 3.125 21.6958 3.73542 22.3062C4.34583 22.9166 5.32708 22.9166 7.29167 22.9166H17.7083C19.6729 22.9166 20.6542 22.9166 21.2646 22.3062C21.875 21.6958 21.875 20.7146 21.875 18.75V7.29165M17.7083 7.29165C17.7083 5.91031 17.1596 4.58555 16.1828 3.6088C15.2061 2.63205 13.8813 2.08331 12.5 2.08331C11.1187 2.08331 9.7939 2.63205 8.81715 3.6088C7.8404 4.58555 7.29167 5.91031 7.29167 7.29165"
                  stroke-width="1.5625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.5833 22.9167V18.75C14.5833 18.1975 14.3638 17.6676 13.9731 17.2769C13.5824 16.8862 13.0525 16.6667 12.5 16.6667C11.9474 16.6667 11.4175 16.8862 11.0268 17.2769C10.6361 17.6676 10.4166 18.1975 10.4166 18.75V22.9167M9.37498 3.125H4.65831C4.3354 3.125 4.00727 3.21042 3.7479 3.46771C2.97498 4.23333 2.52915 5.50833 2.08331 7.29167H7.29165M15.625 3.125H20.3416C20.6646 3.125 20.9927 3.21042 21.2521 3.46771C22.025 4.23333 22.4708 5.50833 22.9166 7.29167H17.7083M6.24998 11.4583H6.77081M6.24998 15.1042H6.77081M18.2291 11.4583H18.75M18.2291 15.1042H18.75M10.9375 8.33333V9.89583M10.9375 9.89583V11.4583M10.9375 9.89583H14.0625M14.0625 8.33333V9.89583M14.0625 9.89583V11.4583"
                  stroke-width="1.5625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <a href="#khachsan">Khách sạn</a>
            </li>

            <li className="li">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.04169 22.9167C1.04169 23.4792 1.51044 23.9584 2.08335 23.9584H15.625C16.2084 23.9584 16.6667 23.4792 16.6667 22.9167V21.875H1.04169V22.9167ZM8.85419 9.37502C4.94794 9.37502 1.04169 11.4584 1.04169 15.625H16.6667C16.6667 11.4584 12.7604 9.37502 8.85419 9.37502ZM3.77085 13.5417C4.9271 11.9271 7.38544 11.4584 8.85419 11.4584C10.3229 11.4584 12.7813 11.9271 13.9375 13.5417H3.77085ZM1.04169 17.7084H16.6667V19.7917H1.04169V17.7084ZM18.75 5.20835V1.04169H16.6667V5.20835H11.4584L11.6979 7.29169H21.6563L20.1979 21.875H18.75V23.9584H20.5417C21.4167 23.9584 22.1354 23.2813 22.2396 22.4271L23.9584 5.20835H18.75Z"
                  fill="black"
                />
              </svg>
              <a href="#anuong">Ăn uống</a>
            </li>

            <li className="li">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7083 12.5H19.7916L12.5 2.08331L5.26038 12.5H7.29163L3.22913 18.75H10.4375V22.9166H14.552V18.75H21.875L17.7083 12.5ZM7.07288 16.6666L11.1354 10.4166H9.24996L12.5104 5.72915L15.7916 10.4166H13.8125L17.9791 16.6666H7.07288Z"
                  fill="black"
                />
              </svg>
              <a href="#hoatdong">Hoạt động</a>
            </li>

            <li className="li1">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 2.08331C10.8424 2.08331 9.25269 2.74179 8.08058 3.9139C6.90848 5.086 6.25 6.67571 6.25 8.33331C6.25 9.81144 6.56458 10.7791 7.42187 11.8489L12.5 17.7083L17.5781 11.8489C18.4354 10.7791 18.75 9.81144 18.75 8.33331C18.75 6.67571 18.0915 5.086 16.9194 3.9139C15.7473 2.74179 14.1576 2.08331 12.5 2.08331Z"
                  stroke="black"
                  stroke-width="2.08333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.20837 15.7739C3.28025 16.5312 2.08337 17.5843 2.08337 18.75C2.08337 21.0521 6.74692 22.9166 12.5 22.9166C18.2532 22.9166 22.9167 21.0521 22.9167 18.75C22.9167 17.5843 21.7198 16.5312 19.7917 15.7739"
                  stroke="black"
                  stroke-width="2.08333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.5 9.37496C13.0753 9.37496 13.5417 8.90859 13.5417 8.33329C13.5417 7.758 13.0753 7.29163 12.5 7.29163C11.9247 7.29163 11.4584 7.758 11.4584 8.33329C11.4584 8.90859 11.9247 9.37496 12.5 9.37496Z"
                  stroke="black"
                  stroke-width="2.08333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <a href="#thamquan">Tham quan</a>
            </li>
          </ul>
        </div>

        <button className="button_serch" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>

      {isPopupActive && (
        <>
          <div className="popup" id="popup">
            <header className="header_popup">
              <span className="header_popup_right"></span>
              <span className="header_popup_mid">
                <h3>Filters</h3>
              </span>

              <span className="header_popup_left" onClick={closePopup}>
                <img
                  src={closeIcon}
                  alt="Close"
                  className="popup_close"
                  onClick={closePopup}
                />
              </span>
            </header>

            <main className="main_topup">
              <section className="section_main_topup">
                <ul className="menu_main_topup">
                  {/* Địa điểm */}
                  <li className="list_main_topup">
                    <h3
                      className="list_main_topup_title"
                      onClick={() => toggleSubMenu(0)}
                    >
                      <button className="topup_title_button">Địa điểm</button>
                      <i
                        className={`fas fa-angle-right dropdown ${
                          activeDropdown[0] ? "rotate" : ""
                        }`}
                      ></i>
                    </h3>
                    {activeDropdown[0] && (
                      <div className="list_main_topup_content">
                        {["Đà Nẵng", "Huế", "Hội An", "Bà Nà Hills"].map(
                          (location) => (
                            <div key={location} className="search_filter_items">
                              <input
                                className="search_filter_item_input"
                                type="checkbox"
                                name={location}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "location")
                                }
                              />
                              <label className="search_filter_item_label">
                                {location}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </li>

                  {/* Điểm đến (Category) */}
                  <li className="list_main_topup">
                    <h3
                      className="list_main_topup_title"
                      onClick={() => toggleSubMenu(1)}
                    >
                      <button className="topup_title_button">Doanh mục</button>
                      <i
                        className={`fas fa-angle-right dropdown ${
                          activeDropdown[1] ? "rotate" : ""
                        }`}
                      ></i>
                    </h3>
                    {activeDropdown[1] && (
                      <div className="list_main_topup_content">
                        {["Khách sạn", "Ăn uống", "Hoạt động", "Tham quan"].map(
                          (category) => (
                            <div key={category} className="search_filter_items">
                              <input
                                className="search_filter_item_input"
                                type="checkbox"
                                name={category}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "category")
                                }
                              />
                              <label className="search_filter_item_label">
                                {category}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </li>

                  {/* Khoảng giá */}
                  <li className="list_main_topup">
                    <h3
                      className="list_main_topup_title"
                      onClick={() => toggleSubMenu(2)}
                    >
                      <button className="topup_title_button">Khoảng giá</button>
                      <i
                        className={`fas fa-angle-right dropdown ${
                          activeDropdown[2] ? "rotate" : ""
                        }`}
                      ></i>
                    </h3>
                    {activeDropdown[2] && (
                      <div className="list_main_topup_content">
                        <div className="price_input_wrapper">
                          <div>
                            <label className="price-label">Min. price</label>
                            <div className="price-input-container">
                            <span>₫</span>
                            <input
                              type="number"
                              name="minPrice"
                              placeholder="0Đ"
                              value={filters.minPrice}
                              onChange={handleInputChange}
                            />
                            </div>
                          </div>

                          <div>
                            <label className="price-label">Max. price</label>
                            <div className="price-input-container">
                            <span>₫</span>
                            <input
                              type="number"
                              name="maxPrice"
                              placeholder="100.000.0000Đ"
                              value={filters.maxPrice}
                              onChange={handleInputChange}
                            />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>

                  {/* Dịch vụ */}
                  <li className="list_main_topup">
                    <h3
                      className="list_main_topup_title"
                      onClick={() => toggleSubMenu(3)}
                    >
                      <button className="topup_title_button">Dịch vụ</button>
                      <i
                        className={`fas fa-angle-right dropdown ${
                          activeDropdown[3] ? "rotate" : ""
                        }`}
                      ></i>
                    </h3>
                    {activeDropdown[3] && (
                      <div className="list_main_topup_content">
                        {["Có dịch vụ đưa đón", "Không có dịch vụ đưa đón"].map(
                          (service) => (
                            <div key={service} className="search_filter_items">
                              <input
                                className="search_filter_item_input"
                                type="checkbox"
                                name={service}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "service")
                                }
                              />
                              <label className="search_filter_item_label">
                                {service}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </li>

                  {/* Xếp hạng */}
                  <li className="list_main_topup">
                    <h3
                      className="list_main_topup_title"
                      onClick={() => toggleSubMenu(4)}
                    >
                      <button className="topup_title_button">Xếp hạng</button>
                      <i
                        className={`fas fa-angle-right dropdown ${
                          activeDropdown[4] ? "rotate" : ""
                        }`}
                      ></i>
                    </h3>
                    {activeDropdown[4] && (
                      <div className="list_main_topup_content">
                        {[3, 4, 5].map((rating) => (
                          <div key={rating} className="search_filter_items">
                            <input
                              className="search_filter_item_input"
                              type="checkbox"
                              name={rating}
                              onChange={(e) =>
                                handleCheckboxChange(e, "rating")
                              }
                            />
                            <label className="search_filter_item_label">
                              {rating}.0+
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                </ul>
              </section>
            </main>

            <footer className="popup_content">
              <button
                className="popup_reset_all"
                onClick={() =>
                  setFilters({
                    location: [],
                    service: [],
                    category: [],
                    rating: [],
                    minPrice: "",
                    maxPrice: "",
                  })
                }
              >
                Thiết lập lại tất cả
              </button>
              <button className="popup_search" onClick={handleFilterSearch}>
                Hiển thị kết quả
              </button>
            </footer>
          </div>

          {isPopupActive && (
            <div className="overlay1" onClick={closePopup}></div>
          )}
        </>
      )}
    </main>
  );
};

export default SearchPopupComponent;
