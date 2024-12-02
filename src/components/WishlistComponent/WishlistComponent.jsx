import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import DestinationCard from "../DestinationCard/destinationCard";
import "./WishlistComponent.css";

const WishlistComponent = () => {
    const { user } = useContext(AuthContext); 
    const [wishlist, setWishlist] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false); // Trạng thái "mở rộng"

    useEffect(() => {
        if (!user) return; 

        const fetchWishlist = async () => {
            try {
                setLoading(true); 
                const response = await axios.get(
                    `http://localhost:4000/api/v1/wishlist/${user.id}`
                );
                setWishlist(response.data.wishlist || []); 
            } catch (error) {
                console.error("Lỗi khi lấy danh sách wishlist:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchWishlist();
    }, [user]); 

    if (loading) {
        return <p>Đang tải danh sách yêu thích...</p>;
    }

    if (wishlist.length === 0) {
        return <p>Bạn chưa thêm địa điểm nào vào danh sách yêu thích.</p>;
    }

    const toggleExpanded = () => {
        setExpanded(!expanded); // Thay đổi trạng thái mở rộng
    };

    return (
        <div className="container line">
            <h1 className="mgt">Danh sách đã lưu </h1>
            <div className={`card_list1 ${expanded ? "expanded" : "collapsed"}`}>
                {wishlist.map((item) => (
                    <DestinationCard
                        key={item._id}
                        destinations={[item.destination_id]} 
                    />
                ))}
            </div>
            {wishlist.length > 4 && (
                <button className="toggle-button" onClick={toggleExpanded}>
                    {expanded ? "Thu gọn" : "Xem thêm"}
                </button>
            )}
        </div>
    );
};

export default WishlistComponent;
