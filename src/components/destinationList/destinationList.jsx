// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const DestinationList = () => {
//     const [destinations, setDestinations] = useState([]);

//     useEffect(() => {
//         // Gọi API để lấy danh sách destination
//         axios.get('http://localhost:4000/api/v1/destination/list') 
//             .then(response => {
//                 setDestinations(response.data); 
//             })
//             .catch(error => {
//                 console.error("Lỗi khi lấy danh sách destination:", error);
//             });
//     }, []);

//     return (
//         <div>
//             <h1>Danh sách Destination</h1>
//             <ul>
//                 {destinations.map(destination => (
//                     <li key={destination.destination_id}>
//                         <h2>{destination.name}</h2>
//                         <p>{destination.description}</p>
//                         <p>Category: {destination.category}</p>
//                         <p>Price: {destination.price}</p>
//                         <p>Rating: {destination.rating}</p>
//                         <p>Location: {destination.location}</p>
//                         <p>Open Hours: {destination.open_hours}</p>
//                         <img src={destination.image_url} alt={destination.name} />
//                         <p>Distance: {destination.distance}</p>
//                         <p>Service: {destination.service}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default DestinationList;
