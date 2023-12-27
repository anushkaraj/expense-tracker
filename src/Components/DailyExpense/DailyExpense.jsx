import data from '../../Data/SourceOfIncome.json';
import { useEffect, useState } from 'react';

import axios, * as others from 'axios';
export default function DailyExpense()
{
 
  useEffect(()=>{
   axios.get('http://localhost:3000/incomeSources').then(
    res=>{
     console.log("res is", res )
    }
   ).catch(err=>console.log(" error is ", err));
  }, []);
  
   useEffect(()=>{
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    console.log(" last day ", lastDayOfMonth);
    //const current= new Date();
    if (currentDate.getDate() === lastDayOfMonth) {
  
      axios.put('http://localhost:3000/incomeSources/1', {
        "name": "Salary",
        "amount":5000 ,
        "frequency": "monthly"
      }).then(resp => {
      
          console.log(resp.data);
      }).catch(error => {
      
          console.log(error);
      });
    }
   })
  
  
}