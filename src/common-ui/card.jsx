import React from "react";

export default function Card(props) {
  const handleCardClick = () => {
    // Perform your onclick operation here
    console.log("Card clicked! Category:", props.category, "Amount:", props.amount);
    // Add your custom logic here
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
      <div>{props.amount}</div>
    </div>
  );
}
