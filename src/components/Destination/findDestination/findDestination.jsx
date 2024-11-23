import { useEffect, useState } from "react";
import "./findDestination.css";
import beach from "../../../assets/img/beach.jpg";
import mountain from "../../../assets/img/mountain.jpg";
import city from "../../../assets/img/CityAdventure.jpg";
import { useNavigate } from "react-router-dom";

const FindDestination = () => {
  const [categories, setCategories] = useState([]);
  const [morning, setMorning] = useState("");
  const [afternoon, setAfternoon] = useState("");
  const [evening, setEvening] = useState("");
  const [budget, setBudget] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [address, setAddress] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "http://localhost:4000/api/v1/destination/categories",
        requestOptions
      );

      // Log response để debug
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (data.type === "success" && Array.isArray(data.categories)) {
        // Chuyển đổi mảng categories thành format phù hợp với component
        const formattedCategories = data.categories.map((name, index) => ({
          _id: index.toString(),
          name: name,
        }));

        setCategories(formattedCategories);
      } else {
        throw new Error("Dữ liệu không đúng định dạng");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Không thể tải danh sách loại hình. Vui lòng thử lại sau.");
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      setAddressesLoading(true);
      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "http://localhost:4000/api/v1/destination/addresses",
        requestOptions
      );

      const data = await response.json();
      console.log("Addresses data:", data);

      if (data.type === "success" && Array.isArray(data.addresses)) {
        setAddresses(data.addresses);
      } else {
        throw new Error("Dữ liệu địa chỉ không đúng định dạng");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setError("Không thể tải danh sách địa điểm. Vui lòng thử lại sau.");
    } finally {
      setAddressesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAddresses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Validate dữ liệu chi tiết hơn
    if (!budget || Number(budget) <= 0) {
      setError("Vui lòng nhập ngân sách hợp lệ");
      setLoading(false);
      return;
    }

    if (!totalDays || Number(totalDays) <= 0) {
      setError("Vui lòng nhập số ngày hợp lệ");
      setLoading(false);
      return;
    }

    if (!address || address === "Chọn thành phố") {
      setError("Vui lòng chọn địa điểm");
      setLoading(false);
      return;
    }

    // Kiểm tra categories
    if (!morning || morning === "Chọn loại hình") {
      setError("Vui lòng chọn loại hình cho buổi sáng");
      setLoading(false);
      return;
    }

    if (!afternoon || afternoon === "Chọn loại hình") {
      setError("Vui lòng chọn loại hình cho buổi chiều");
      setLoading(false);
      return;
    }

    if (!evening || evening === "Chọn loại hình") {
      setError("Vui lòng chọn loại hình cho buổi tối");
      setLoading(false);
      return;
    }

    // Kiểm tra categories không trùng nhau
    const uniqueCategories = new Set([morning, afternoon, evening]);
    if (uniqueCategories.size !== 3) {
      setError("Vui lòng chọn các loại hình khác nhau cho mỗi buổi");
      setLoading(false);
      return;
    }

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const userRequireData = JSON.stringify({
        userId: "6713ca8b99a309b58a220ae9",
        category: [morning, afternoon, evening],
        budget: Number(budget),
        totalDay: Number(totalDays),
        address: address,
      });

      console.log("UserRequire Data:", userRequireData);

      // Gọi API tạo userRequire
      const userRequireResponse = await fetch(
        "http://localhost:4000/api/v1/plan/",
        {
          method: "POST",
          headers: myHeaders,
          body: userRequireData,
          redirect: "follow",
        }
      );

      const result = await userRequireResponse.json();
      console.log("Server response:", result);

      if (!userRequireResponse.ok) {
        throw new Error(result.message || "Có lỗi xảy ra khi tạo yêu cầu");
      }

      // Lấy ID từ object userRequire trong response
      const userRequireId = result.userRequire._id;
      if (!userRequireId) {
        throw new Error("Không tìm thấy ID trong response");
      }

      console.log("UserRequire ID:", userRequireId);

      // Bước 2: Dùng ID để tạo plan
      const planResponse = await fetch(
        `http://localhost:4000/api/v1/plan/create/${userRequireId}`,
        {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        }
      );

      const planResult = await planResponse.json();
      console.log("Plan created:", planResult);

      // Kiểm tra response từ API
      if (!planResponse.ok || planResult.type === "error") {
        throw new Error(planResult.message || "Có lỗi xảy ra khi tạo kế hoạch");
      }

      // Nếu có dữ liệu hợp lệ, chuyển hướng đến trang kết quả
      if (planResult.selectedTrips && planResult.selectedTrips.length > 0) {
        console.log("Final Plan Data:", planResult);
        navigate("/listDestination", { state: { planData: planResult } });
      } else {
        throw new Error("Không tìm thấy kế hoạch phù hợp");
      }

      console.log("Final Plan Data:", planResult);
      navigate("/listDestination", { state: { planData: planResult } });
    } catch (error) {
      console.error("Error Full Details:", {
        message: error.message,
        error: error,
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMorningChange = (event) => {
    setMorning(event.target.value);
  };

  const handleAfternoonChange = (event) => {
    setAfternoon(event.target.value);
  };

  const handleEveningChange = (event) => {
    setEvening(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleTotalDaysChange = (event) => {
    setTotalDays(event.target.value);
  };

  return (
    <div className="find-destination">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Đang xử lý...</div>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <div className="container">
        <form className="search-form" onSubmit={handleSubmit}>
          <section className="destination-search">
            <h2>Tìm điểm đến</h2>
            <div className="time-selection">
              <span>Loại</span>
              {categoriesLoading ? (
                <div>Đang tải danh sách loại hình...</div>
              ) : (
                <div className="time-selection-category">
                  <div className="time-selection-item">
                    <label>Buổi sáng</label>
                    <select value={morning} onChange={handleMorningChange}>
                      <option value="">Chọn loại hình</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="time-selection-item">
                    <label>Buổi chiều</label>
                    <select value={afternoon} onChange={handleAfternoonChange}>
                      <option value="">Chọn loại hình</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="time-selection-item">
                    <label>Buổi tối</label>
                    <select value={evening} onChange={handleEveningChange}>
                      <option value="">Chọn loại hình</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="budget-days">
              <div className="input-info">
                <label>Địa điểm</label>
                {addressesLoading ? (
                  <div>Đang tải danh sách địa điểm...</div>
                ) : (
                  <select value={address} onChange={handleAddressChange}>
                    <option>Chọn thành phố</option>
                    {addresses.map((addr, index) => (
                      <option key={index} value={addr}>
                        {addr}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="input-info">
                <label>Ngân sách</label>
                <input
                  type="number"
                  placeholder="Nhập ngân sách"
                  value={budget}
                  onChange={handleBudgetChange}
                />
              </div>
              <div className="input-info">
                <label>Tổng số ngày</label>
                <input
                  type="number"
                  placeholder="Nhập tổng số ngày"
                  value={totalDays}
                  onChange={handleTotalDaysChange}
                />
              </div>
            </div>
            <button className="search-button" type="submit">
              Tìm kiếm
            </button>
          </section>
        </form>
        <div className="recommendations">
          <h2>Đề xuất</h2>
          <div className="recommendation fade-in">
            <figure className="recommendation-figure">
              <img src={beach} alt="beach" className="recommendation-img" />
            </figure>
            <div className="recommendation-info">
              <h3>Bãi biển đẹp</h3>
              <p>
                Trải nghiệm ánh nắng mặt trời và cát tại bãi biển xinh đẹp này.
              </p>
            </div>
          </div>
          <div className="recommendation fade-in">
            <figure className="recommendation-figure">
              <img
                src={mountain}
                alt="mountain"
                className="recommendation-img"
              />
            </figure>
            <div className="recommendation-info">
              <h3>Khóa tu trên núi</h3>
              <p>Tận hưởng kỳ nghỉ yên bình trên núi.</p>
            </div>
          </div>
          <div className="recommendation fade-in">
            <figure className="recommendation-figure">
              <img src={city} alt="city" className="recommendation-img" />
            </figure>
            <div className="recommendation-info">
              <h3>Cuộc phiêu lưu thành phố</h3>
              <p>Khám phá cuộc sống sôi động của thành phố.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDestination;
