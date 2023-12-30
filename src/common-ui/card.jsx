import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
  const navigate = useNavigate(); 
 
  const handleCardClick = () => {
    console.log(" ia ma called");
    sessionStorage.setItem("category", props.category);
    // Redirect to a new page with the selected category
    navigate('/category');
  };
 
  return (
    <div
      className="row"
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '15px',
        marginBottom: '15px',
        fontSize: "20px",
        fontWeight: "500",
        color: "#D22B2B"
      }}
      onClick={handleCardClick}
    >
      <div>{props.category}</div>
      <div>₹{props.amount}</div>
    </div>
  );
}
