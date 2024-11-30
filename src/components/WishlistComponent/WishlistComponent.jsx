import React, { useState, useEffect } from "react";
import axios from "axios";
import DestinationCard from "../DestinationCard/destinationCard";

const WishlistComponent = ({ userId }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/wishlist/${userId}`)
      .then((response) => {
        setWishlist(response.data.wishlist || []);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  }, [userId]);

  return (
    <div className="wishlist-page">
      <h1>Danh sách ưu thích</h1>
      {wishlist.length > 0 ? (
        wishlist.map((destination) => (
          <DestinationCard
            key={destination._id}
            destination={destination}
            isWishlisted={true}
            onToggleWishlist={() => {}}
          />
        ))
      ) : (
        <p>Bạn chưa thêm địa điểm nào vào danh sách ưu thích.</p>
      )}
    </div>
  );
};

export default WishlistComponent;
