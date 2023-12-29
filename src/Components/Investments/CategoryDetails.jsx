


import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardForCategoryDetails from '../../common-ui/CardForCategoryDetails';
import YearCard from '../../common-ui/YearCard'

function CategoryDetails() {
  var category_from_storage = sessionStorage.getItem("category");
  const [data, setdata] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/investments/getCompleteData')
      .then(response => {
        setdata(response.data);
        console.log('Complete JSON Data:', response.data);
      })
      .catch(error => {
        console.error('Error fetching complete data:', error);
      });
  }, [category_from_storage]);

  console.log(" category", category_from_storage);
  var data_for_printing = [];

  if (data) {
    for (const category in data.investments) {
      if (category === category_from_storage) {
        for (const year in data.investments[category]) {
         
        }
      }
    }
  }

  console.log("data in category is ", data_for_printing);
  return (
    <div>
      {data &&
        Object.keys(data.investments).map((category) => {
          if (category === category_from_storage) {
            return Object.keys(data.investments[category]).map((year) => (
              <YearCard key={year} title={`Year ${year}`} content={data.investments[category][year]} />
            ));
          }
          return null;
        })}
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

export default CategoryDetails;
