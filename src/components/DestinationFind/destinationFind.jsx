import { useEffect, useState } from "react";
import "./destinationFind.css";
import beach from "../../assets/img/beach.jpg";
import mountain from "../../assets/img/mountain.jpg";
import city from "../../assets/img/CityAdventure.jpg";
import { useNavigate } from "react-router-dom";

const FindDestination = () => {
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [address, setAddress] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [people, setPeople] = useState("");

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

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (data.status === true && Array.isArray(data.categories)) {
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
    
    if (!people || Number(people) <= 0) {
      setError("Vui lòng nhập số người");
      setLoading(false);
      return;
    }

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const userRequireData = JSON.stringify({
        userId: "6713ca8b99a309b58a220ae9",
        category: selectedCategories,
        budget: Number(budget),
        quantity: Number(people),
        totalDay: Number(totalDays),
        location: address,
      });

      console.log("UserRequire Data:", userRequireData);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: userRequireData,
        redirect: "follow"
      };

      const userRequireResponse = await fetch("http://localhost:4000/api/v1/plan/", requestOptions);

      const result = await userRequireResponse.json();
      console.log("Server response:", result);

      if (!userRequireResponse.ok) {
        throw new Error(result.message || "Có lỗi xảy ra khi tạo yêu cầu");
      }

      const userRequireId = result.userRequire._id;
      if (!userRequireId) {
        throw new Error("Không tìm thấy ID trong response");
      }

      console.log("UserRequire ID:", userRequireId);

      const planResponse = await fetch(`http://localhost:4000/api/v1/plan/create/${userRequireId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const planResult = await planResponse.json();
      console.log("Plan created:", planResult);

      if (!planResponse.ok || planResult.type === "error") {
        throw new Error(planResult.message || "Có lỗi xảy ra khi tạo kế hoạch");
      }

      if (planResult.selectedTrips && planResult.selectedTrips.length > 0) {
        console.log("Final Plan Data:", planResult);
        navigate("/listDestination", { state: { planData: planResult } });
      } else {
        throw new Error("Không tìm thấy kế hoạch phù hợp");
      }
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

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleTotalDaysChange = (event) => {
    setTotalDays(event.target.value);
  };

  const handleCategoryChange = (e, categoryName) => {
    if (e.target.checked) {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, categoryName]);
        setQuantities({ ...quantities, [categoryName]: 1 });
      }
    } else {
      setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
      const newQuantities = { ...quantities };
      delete newQuantities[categoryName];
      setQuantities(newQuantities);
    }
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
              <span className="time-selection-area">Chọn loại khu vực (tối đa 3)</span>
              {categoriesLoading ? (
                <div>Đang tải danh sách loại hình...</div>
              ) : (
                <div className="categories-checklist">
                  {categories.map((category) => (
                    <div key={category._id} className="category-checkbox-item">
                      <input
                        type="checkbox"
                        id={category._id}
                        value={category.name}
                        onChange={(e) => handleCategoryChange(e, category.name)}
                        checked={selectedCategories.includes(category.name)}
                        disabled={!selectedCategories.includes(category.name) && selectedCategories.length >= 3}
                        className="category-checkbox"
                      />
                      <label htmlFor={category._id}>{category.name}</label>
                    </div>
                  ))}
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
                <label>Số người</label>
                <input
                  type="number"
                  placeholder="Nhập số người"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
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