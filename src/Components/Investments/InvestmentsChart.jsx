import React, { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


// ... (import statements)

export default function InvestmentsChart(props) {
  
  const [pieChartData, setPieChartData] = useState(null);
const response =props.investmentdata;
console.log("investment data is ",response);
  useEffect(() => {
    var data_for_pie_chart = [];
    var category_for_pie_chart=[];
    console.log('response is ', response);
    if (response) {
      for (const category in response.investments) {
       var sum=0;
        category_for_pie_chart.push(category)
        for (const year in response.investments[category]) {
          
          for (const month in response.investments[category][year]) {
            
            for (const investmentId in response.investments[category][year][month]) {
              const investment = response.investments[category][year][month][investmentId];
              
              sum=sum+investment.amount;
            }
          }
        }
      
        data_for_pie_chart.push(sum);
      }
      if(response)
      {
        setPieChartData({
          labels: category_for_pie_chart,
          datasets: [
            {
              label: 'amount',
              data: data_for_pie_chart,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      }
    
    }
  }, [response]);

  return (
    <>
      {response&& pieChartData && <Pie data={pieChartData}></Pie>}
    </>
  );
}
