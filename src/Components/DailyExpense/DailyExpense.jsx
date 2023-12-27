import data from '../../Data/SourceOfIncome.json';
import { useEffect, useState, useRef } from 'react';

import axios, * as others from 'axios';
export default function DailyExpense()
{
 
  const incomeData = useRef(0);
  const [isSalaryUpdated, setIsSalaryUpdated] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/incomeSources');
        console.log('res is', response);
        incomeData.current = response.data[0].amount;
        setIsDataFetched(true);
      } catch (error) {
        console.log('error is', error);
      }
    };

    fetchData();
  }, []);
  
   useEffect(()=>{
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    console.log(" last day ", lastDayOfMonth);
    const current= new Date();
    const updateSalary = async () => {
      try {
        const updatedAmount = incomeData.current + 50000;

        const response = await axios.put('http://localhost:3000/incomeSources/1', {
          name: 'Salary',
          amount: updatedAmount,
          frequency: 'monthly'
        });
         setIsSalaryUpdated(true);
        console.log('Salary updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating salary:', error);
      }
    };

    if (currentDate.getDate() === current.getDate()&& !isSalaryUpdated && isDataFetched) {
      updateSalary();
    }
   },[incomeData, isDataFetched, isSalaryUpdated])
  
  
}