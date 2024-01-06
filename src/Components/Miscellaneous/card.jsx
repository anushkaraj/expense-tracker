import React from "react";
import { useNavigate } from 'react-router-dom';

import money1 from '../../images/1.png'; 
import money2 from '../../images/2.png'; 
import money3 from '../../images/3.png'; 
import money4 from '../../images/4.png'; 
import money5 from '../../images/5.png'; 
import money6 from '../../images/6.png'; 
import money7 from '../../images/7.png'; 
import money8 from '../../images/8.png'; 

const icons = [money1,money2,money3,money4,money5,money6,money7,money8]
console.log(icons)
export default function Card(props) {
  const navigate = useNavigate();
  const selectedIcon = icons[Math.floor(Math.random() * icons.length)]; // Choose a random icon
  var datatosend=props.datatoshow;
  const handleCardClick = () => {
    console.log("I am called");
    
  Object.keys(datatosend).map(
      (category) =>{
        if(category ===props.category)
        {console.log("category is ",category);
          datatosend=datatosend[category];
          console.log("props data to shoe ",datatosend
          );
        }
      });
      console.log("props data to shoe ",datatosend
      );
    // sessionStorage.setItem("categorymiscellaneous", props.category);
    // Redirect to a new page with the selected category
    navigate('/category/Miscellaneous'  ,{state:{datatosend:datatosend, category: props.category,}});  
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
        fontSize: "17px",
        fontWeight: "500",
        textTransform: 'capitalize', // Capitalize only the first letter
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow
        padding: '15px', // Add padding for a better look
        borderRadius: '8px', // Optional: Add border-radius for rounded corners
        cursor: 'pointer', // Add cursor pointer for better user interaction
      }}
      onClick={handleCardClick}
    >
      <div style={{display:"flex"}} >
      <img style={{width:"30px",height:"30px"}} src={selectedIcon}  />
       <div style={{marginLeft:"10px",marginTop:"7px"}}>{props.category}</div> 
      </div>
      <div style={{marginTop:"7px"}}>₹{props.amount}</div>
    </div>
  );
}
