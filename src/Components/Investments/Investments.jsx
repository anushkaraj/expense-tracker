import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InvestmentsChart from './InvestmentsChart';

const Investments = () => {
  const [data, setdata]=useState(null);
  // Sample data from React
  const newEquityRecord = {
    category: 'liquid',
    year: '2023',
    month: 'January',
    amount: 20000,
    date: '2023-01-15',
    description: 'New Equity Investment',
  };

  const deleteEquityRecord = {
    category: 'liquid',
    year: '2023',
    month: 'January',
    investmentKey: 'investment4', // Replace with the actual investment key
  };

  // useEffect(() => {
  //   console.log("calling this ")
  //   // Add a new equity record
  //   axios.post('http://localhost:5000/travelexpenses/addRecord', newEquityRecord)
  //     .then(response => {
  //       console.log('Add Equity Record Success:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Add Equity Record Error:', error);
  //     })
  //   }, []);

  //   // Delete an equity record
  //   axios.post('http://localhost:5000/investments/deleteRecord', deleteEquityRecord)
  //     .then(response => {
  //       console.log('Delete Equity Record Success:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Delete Equity Record Error:', error);
  //     });

  //   // Fetch complete JSON data
    // axios.get('http://localhost:5000/investments/getCompleteData')
    //   .then(response => {
    //     console.log('Complete JSON Data:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching complete data:', error);
    //   });
  // }, []);
  useEffect(()=>{
    axios.get('http://localhost:5000/investments/getCompleteData')
      .then(response => {
        setdata(response.data);
        console.log('Complete JSON Data:', response.data);
      })
      .catch(error => {
        console.error('Error fetching complete data:', error);
      });

  },[]);

  return ( 
    <div>
     
      <InvestmentsChart investmentdata={data}></InvestmentsChart>
    </div>
  );
};

export default Investments;
