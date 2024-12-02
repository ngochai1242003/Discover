import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import DestinationCard from "../DestinationCard/destinationCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./WishlistComponent.css";

const WishlistComponent = () => {
    const { user } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false); // Toggle mở rộng danh sách wishlist

    // Fetch wishlist từ API
    useEffect(() => {
        if (!user) return;

        const fetchWishlist = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000/api/v1/wishlist/${user.id}`);
                setWishlist(response.data.wishlist || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách wishlist:", error);
                alert("Không thể tải danh sách yêu thích. Vui lòng thử lại.");
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [user]);

    // Toggle hiển thị mở rộng/thu gọn wishlist
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    // Xử lý kéo thả
    const handleDragEnd = (result) => {
        if (!result.destination) return; // Nếu không có điểm đến, không làm gì

        const { source, destination } = result;

        if (source.droppableId === "wishlist" && destination.droppableId === "itinerary") {
            // Chuyển item từ wishlist sang itinerary
            const selected = wishlist[source.index];
            setItinerary((prev) => [...prev, selected]);
            setWishlist((prev) => prev.filter((_, idx) => idx !== source.index));
        }

        if (source.droppableId === "itinerary" && destination.droppableId === "itinerary") {
            // Thay đổi thứ tự trong itinerary
            const reorderedItinerary = Array.from(itinerary);
            const [removed] = reorderedItinerary.splice(source.index, 1);
            reorderedItinerary.splice(destination.index, 0, removed);
            setItinerary(reorderedItinerary);
        }

        if (source.droppableId === "wishlist" && destination.droppableId === "wishlist") {
            // Thay đổi thứ tự trong wishlist
            const reorderedWishlist = Array.from(wishlist);
            const [removed] = reorderedWishlist.splice(source.index, 1);
            reorderedWishlist.splice(destination.index, 0, removed);
            setWishlist(reorderedWishlist);
        }
    };

    // Gửi lịch trình đã lưu lên server
    const saveItinerary = async () => {
        try {
            const user_id = user.id;
            const destinations = itinerary.map((item) => item.destination_id);

            await axios.post("http://localhost:4000/api/v1/itinerary/save", { user_id, destinations });
            alert("Lịch trình đã được lưu thành công!");
        } catch (error) {
            console.error("Error saving itinerary:", error);
            alert("Lỗi khi lưu lịch trình. Vui lòng thử lại.");
        }
    };

    if (loading) {
        return <p>Đang tải danh sách yêu thích...</p>;
    }

    if (wishlist.length === 0) {
        return <p>Bạn chưa thêm địa điểm nào vào danh sách yêu thích.</p>;
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="container">
                <h1 className="mgt">Danh sách đã lưu</h1>

                {/* Wishlist Droppable */}
                <Droppable droppableId="wishlist">
                    {(provided) => (
                        <div
                            className={`card_list1 ${expanded ? "expanded" : "collapsed"}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {wishlist.map((item, index) => (
                                <Draggable key={item._id.toString()} draggableId={item._id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <DestinationCard destinations={[item.destination_id]} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                {/* Nút mở rộng/thu gọn */}
                {wishlist.length > 4 && (
                    <button className="toggle-button" onClick={toggleExpanded}>
                        {expanded ? "Thu gọn" : "Xem thêm"}
                    </button>
                )}

                <h2>Lịch trình của bạn</h2>

                {/* Itinerary Droppable */}
                <Droppable droppableId="itinerary">
                    {(provided) => (
                        <div
                            className="itinerary"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {itinerary.map((item, index) => (
                                <Draggable key={`itinerary-${item._id.toString()}`} draggableId={`itinerary-${item._id.toString()}`} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <DestinationCard destinations={[item.destination_id]} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                {/* Nút lưu lịch trình */}
                <button onClick={saveItinerary} className="save-button">
                    Lưu Lịch Trình
                </button>
            </div>
        </DragDropContext>
    );
};

export default WishlistComponent;
