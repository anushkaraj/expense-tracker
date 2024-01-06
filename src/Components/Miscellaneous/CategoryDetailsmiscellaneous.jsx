import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CardForCategoryDetails from "../../common-ui/CardForCategoryDetails";
import YearCard from "./YearCard";
import "./CategoryDetails.css";
import { useLocation } from "react-router-dom";
import DeleteInvestment from "./DeleteInvestment";
import money1 from "../../images/1.png";
import money2 from "../../images/2.png";
import money3 from "../../images/3.png";
import money4 from "../../images/4.png";
import money5 from "../../images/5.png";
import money6 from "../../images/6.png";
import money7 from "../../images/7.png";
import money8 from "../../images/8.png";

function CategoryDetailsmiscellaneous() {
  const { state } = useLocation();
  console.log("xxxxx", state.datatosend);
  console.log(">>>>>>>>>>>>>", state.category);
  Object.keys(state.datatosend).map((category) => {
    console.log("categpru os ", category);
  });
  //var category_from_storage = sessionStorage.getItem("categoryInvestments");
  const [data, setdata] = useState(state.datatosend);
  const [refreshdata, setrefreshData] = useState(false);
  const [haveNodata, sethaveNoData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [deleteInvestmentKey, setInvestmentKey] = useState(null);
  const [dataToBeDeleted, setDatatoBeDeleted] = useState(null);
  const [dataDeleted, setdatadeleted] = useState(false);
  var category_selected;
  const handleDeleteFunction = (investment, investmentKey) => {
    console.log("investment", investment);
    setDatatoBeDeleted(investment);
    setInvestmentKey(investmentKey);
        setShowDeleteComponent(true);
    console.log("again");
  };
  const icons = [
    money1,
    money2,
    money3,
    money4,
    money5,
    money6,
    money7,
    money8,
  ];
  const selectedIcon = icons[Math.floor(Math.random() * icons.length)];
  useEffect(() => {
    setdata(state.datatosend);
  }, [refreshdata]);
  // useEffect(() => {
  //   let isMounted = true;

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/investments/getCompleteData');
  //       if (isMounted) {
  //         setdata(response.data);
  //         console.log('Complete JSON Data:', response.data);

  //         if (response.data && response.data.investments && !response.data.investments[category_from_storage]) {
  //           sethaveNoData(true);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching complete data:', error);
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [category_from_storage, refreshdata]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get day, month, and year components
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });

    // Format the date as "5 Jan"
    const formattedDate = `${day} ${month}`;

    return formattedDate;
  };
  const handleNewData = (newData) => {
    setdata(newData);
  };
  Object.keys(data).map((category) => {
    console.log("categpru occccs ", category);
  });
 
  // console.log(" category", category_from_storage);
  return (
    <div>
      {
          Object.keys(data).map((year) =>
            Object.keys(data[year]).map((month) =>
              Object.keys(data[year][month]).map((investmentKey) => {
                const investment = data[year][month][investmentKey];
                
                return (
                  <div
                    key={investmentKey}
                    className="investment-item"
                    onClick={() => {
                      handleDeleteFunction(investment,investmentKey,state.category);
                    }}
                  >
                    <img
                     className="image"
                      src={selectedIcon}
                    />
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{investment.description}</span>
                      <span>{formatDate(investment.date)}</span>
                    </p>
                    <p className="investmentAmount">₹{investment.amount}</p>
                  </div>
                );
              })
            )
          )
            
      }
      {showDeleteComponent && (
        <DeleteInvestment
          date={dataToBeDeleted.date}
          investmentKey={deleteInvestmentKey}
          category={category_selected}
          show={showDeleteComponent}
          onRequestClose={() => {
            setShowDeleteComponent(false);
          }}
          investmentdeleted={() => setShowDeleteComponent(false)}
          handleNewData={handleNewData}
        />
      )}
      {false && (
        <div className="error-container">
          <div className="emoji">😅</div>
          <h1>Oops! No Data Found !</h1>
          <p className="tagline">
            <em>"Please invest in me!🚀"</em>
          </p>
        </div>
      )}
    </div>
  );
}

//  data_for_printing && (
//   <div>
//     {data_for_printing.map((i, index) => (
//       <CardForCategoryDetails key={index} description={i.description} date={i.date} amount={i.amount}></CardForCategoryDetails>
//     ))}
//   </div>
//);

export default CategoryDetailsmiscellaneous;
