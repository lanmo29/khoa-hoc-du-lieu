import React from "react";
import Banner from "./Banner/Banner";
import Contact from "./Contact/Contact";
import CvHome from "./CV/CvHome";
import Footer from "./Footer/Footer";
import ListCategories from "./ListCategories/ListCategories";
import ListJobs from "./ListJobs/ListJobs";
import ListNew from "./New/ListNew";

export default function Home() {

  return (
    <div>
      {/* <Menu /> */}
      <Banner />
      <ListCategories />
      <CvHome />
      <ListJobs />
      <Contact />
      <ListNew />
      <Footer />
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import axios

// export default function Home() {
//   // State để lưu trữ dữ liệu người dùng
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // // useEffect để gọi API khi component mount
//   // useEffect(() => {
//   //   const fetchUsers = async () => {
//   //     try {
//   //       const response = 
//   //       // await fetch('https://cors-anywhere.herokuapp.com/https://ms-hop.azurewebsites.net/api/users'); // Yêu cầu tới proxy
//   //      await fetch('https://ms-hop.azurewebsites.net/api/users', {
//   //         method: 'GET',
//   //         mode: 'no-cors'
//   //       })
//   //       if (!response.ok) {
//   //         throw new Error('Network response was not ok ' + response.statusText);
//   //       }
//   //       const data = await response.json();
//   //       setUsers(data);
//   //       setLoading(false);
//   //     } catch (error) {
//   //       setError(error);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchUsers();
//   // }, []);
//   // useEffect để gọi API khi component mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Sử dụng axios để gọi API
//         const response = await axios.get('https://cors-anywhere.herokuapp.com/https://ms-hop.azurewebsites.net/api/users');
//         setUsers(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);
//   return (
//     <div>
//       <div>
//         <h2>Users</h2>
//         {loading && <p>Loading...</p>}
//         {error && <p>Error: {error.message}</p>}
//         <ul>
//           {users.map((user) => (
//             <li key={user.id}>{user.name}</li> // Giả sử user có các thuộc tính id và name
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
