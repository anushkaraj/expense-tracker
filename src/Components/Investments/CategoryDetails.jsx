


import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardForCategoryDetails from '../../common-ui/CardForCategoryDetails';
import YearCard from './YearCard';
import './CategoryDetails.css';

function CategoryDetailsInvestment() {
  var category_from_storage = sessionStorage.getItem("categoryInvestments");
  const [data, setdata] = useState(null);
  const [refreshdata,setrefreshData]=useState(false);
  const [haveNodata, sethaveNoData]=useState(false);
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const response = await axios.get('https://expense-backend-e411.onrender.com/investments/getCompleteData');
        if (isMounted) {
          setdata(response.data);
          console.log('Complete JSON Data:', response.data);
  
          if (response.data && response.data.investments && !response.data.investments[category_from_storage]) {
            sethaveNoData(true);
          }
        }
      } catch (error) {
        console.error('Error fetching complete data:', error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [category_from_storage, refreshdata]);
  
 

  console.log(" category", category_from_storage);
  return (
    <div>
      {data &&
        Object.keys(data.investments).map((category) => {
          if (category === category_from_storage) {
           
            return Object.keys(data.investments[category]).map((year) => (
              <YearCard key={year} title={`Year ${year}`} content={data.investments[category][year]} dataisdeleted={()=>{ console.log("i am here ", refreshdata);setrefreshData(true)}} />
            ));
          }
          return null;
        })}
     {haveNodata && (
  <div class="error-container">
  <div class="emoji">😅</div>
  <h1>Oops! No Data Found !</h1>
  <p class="tagline"><em>"Please invest in me!🚀"</em></p>
</div>
)}


    </div>
  );
  
   
      
  
  
  //  data_for_printing && (
  //   <div>
  //     {data_for_printing.map((i, index) => (
  //       <CardForCategoryDetails key={index} description={i.description} date={i.date} amount={i.amount}></CardForCategoryDetails>
  //     ))}
  //   </div>
  //);
}

export default CategoryDetailsInvestment;
