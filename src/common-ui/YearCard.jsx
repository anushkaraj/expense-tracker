import React, { useState } from 'react';
import './YearCard.css'; // Create a separate CSS file for styling
import DeleteInvestment from '../Components/Investments/DeleteInvestment';
const YearCard = ({ title, content }) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const [showDeleteComponent, setShowDeleteComponent]=useState(false);
  const [dataYearCard, setDataYearCrad]=useState(content);
  const [monthCollapse, setMonthCollapse] = useState(() => {
    const initialMonthCollapse = {};
    Object.keys(content).forEach((month) => {
      initialMonthCollapse[month] = true;
    });
    return initialMonthCollapse;
  });
  console.log(" clicked ", showDeleteComponent);
  const handleNewData =(newData)=>{
    setDataYearCrad(newData);
  }
  const handleDeletefunction =()=>{
  
    setShowDeleteComponent(true);
    console.log("again")
  }
//   const handleDelfunction =()=>{
  
//     setShowDeleteComponent(false);
//     setTimeout(()=>{console.log(" show",showDeleteComponent);},5000)
    
//   }
  const handleToggle = () => {
    setCollapsed(!isCollapsed);
  };

  const handleMonthToggle = (month) => {
    setMonthCollapse((prev) => ({ ...prev, [month]: !prev[month] }));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Get day, month, and year components
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
  
    // Format the date as "5 Jan"
    const formattedDate = `${day} ${month}`;
  
    return formattedDate;
  };

  return (
    <div className={`collapsible-card ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className="card-header" onClick={handleToggle}>
        <h3>{title}</h3>
      </div>
      {!isCollapsed && (
        <div className="card-content">
          {Object.keys(content).map((month) => (
            <div key={month} className="month-container">
              <div className="month-header" onClick={() => handleMonthToggle(month)}>
                <h4>{month}</h4>
              </div>
              {monthCollapse[month] && (
                <div className="month-content">
                  {Object.keys(content[month]).map((investmentKey) => {
                    const investment = content[month][investmentKey];
                    // console.log("in is :",investmentKey)
                    return (
                      <div key={investmentKey} className="investment-item" >
                        <p style={{display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',}}onClick={handleDeletefunction}>
                        <span> ₹{investment.amount}</span>
                          <span>{investment.description}</span>
                          <span>{formatDate(investment.date)}</span>
                        </p>
                       {showDeleteComponent&&<DeleteInvestment
                       date={investment.date}
                       investmentKey={investmentKey} 
                         show={showDeleteComponent}
                         onRequestClose={() => {console.log("i am clicked ");setShowDeleteComponent(false);
                      }}
                      investmentdeleted={()=>setShowDeleteComponent(false)}
                      handleNewData={handleNewData}
        ></DeleteInvestment> }
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    
  );
};

export default YearCard;
