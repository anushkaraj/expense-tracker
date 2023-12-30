


import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import YearCard from './YearCard';
import './CategoryDetails.css';

function CategoryDetailsTripExpense() {
  var category_from_storage = sessionStorage.getItem("categoryTripExpenses");
  const [data, setdata] = useState(null);
  const [refreshdata,setrefreshData]=useState(false);
  const [haveNodata, sethaveNoData]=useState(false);
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tripexpenses/getCompleteData');
        if (isMounted) {
          setdata(response.data);
          console.log('Complete JSON Data:', response.data);
          console.log(" in travel Expense category details");
  
          if (response.data && response.data.tripexpenses && !response.data.tripexpenses[category_from_storage]) {
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
        Object.keys(data.tripexpenses).map((category) => {
          if (category === category_from_storage) {
           
            return Object.keys(data.tripexpenses[category]).map((year) => (
              <YearCard key={year} title={`Year ${year}`} content={data.tripexpenses[category][year]} dataisdeleted={()=>{ console.log("i am here ", refreshdata);setrefreshData(true)}} />
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

export default CategoryDetailsTripExpense;
