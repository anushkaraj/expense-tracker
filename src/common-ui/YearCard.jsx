import React, { useState } from 'react';
import './YearCard.css'; // Create a separate CSS file for styling
import DeleteInvestment from '../Components/Investments/DeleteInvestment';

const YearCard = ({ title, content, dataisdeleted }) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [dataYearCard, setDataYearCard] = useState(content);
  const [dataToBeDeleted, setDatatoBeDeleted] = useState(null);
  const [deleteInvestmentKey, setInvestmentKey] = useState(null);
  const [dataDeleted, setdatadeleted] = useState(false);
  const [dataReceivedIsNull, setdataReceivedIsNull] = useState(false);
  const [monthCollapse, setMonthCollapse] = useState(() => {
    const initialMonthCollapse = {};
    Object.keys(dataYearCard).forEach((month) => {
      initialMonthCollapse[month] = true;
    });
    return initialMonthCollapse;
  });

  const handleNewData = (newData) => {
    if (!newData) {
      setdataReceivedIsNull(true);
    } else {
      setDataYearCard(newData);
    }
  };

  const handleDeleteFunction = (investment, investmentKey) => {
    console.log('investment', investment);
    setDatatoBeDeleted(investment);
    setInvestmentKey(investmentKey);
    setShowDeleteComponent(true);
    console.log('again');
  };

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
    !dataReceivedIsNull && (
      <div className={`collapsible-card ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="card-header" onClick={handleToggle}>
          <h3>{title}</h3>
        </div>
        {!isCollapsed && (
          <div className="card-content">
            {Object.keys(dataYearCard).map((month) => (
              <div key={month} className="month-container">
                <div className="month-header" onClick={() => handleMonthToggle(month)}>
                  <h4>{month}</h4>
                </div>
                {monthCollapse[month] && (
                  <div className="month-content">
                    {Object.keys(dataYearCard[month]).map((investmentKey) => {
                      const investment = dataYearCard[month][investmentKey];
                      console.log('in is:', investmentKey);
                      return (
                        <div key={investmentKey} className="investment-item">
                          <p
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                            onClick={() => {
                              handleDeleteFunction(investment, investmentKey);
                            }}
                          >
                            <span> ₹{investment.amount}</span>
                            <span>{investment.description}</span>
                            <span>{formatDate(investment.date)}</span>
                          </p>
                          {showDeleteComponent && (
                            <DeleteInvestment
                              date={dataToBeDeleted.date}
                              investmentKey={deleteInvestmentKey}
                              show={showDeleteComponent}
                              onRequestClose={() => {
                                console.log('i am clicked ');
                                setShowDeleteComponent(false);
                              }}
                              investmentdeleted={() => setShowDeleteComponent(false)}
                              handleNewData={handleNewData}
                              isdatadeleted={() => {
                                console.log('I am here');
                                setdatadeleted(true);
                                dataisdeleted(true);
                              }}
                            ></DeleteInvestment>
                          )}
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
    )
  );
};

export default YearCard;
