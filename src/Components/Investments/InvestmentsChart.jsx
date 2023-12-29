import React, { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from '../../common-ui/card';



ChartJS.register(ArcElement, Tooltip, Legend);


export default function InvestmentsChart(props) {
const [pieChartData, setPieChartData] = useState(null);
  const [dataForPieChart, setDataForPieChart] = useState([]);
  const [categoriesForPieChart, setCategoriesForPieChart] = useState([]);

  const response = props.investmentdata;

  useEffect(() => {
    console.log('response is ', response);

    if (response) {
      const newDataForPieChart = [];
      const newCategoriesForPieChart = [];

      for (const category in response.investments) {
        let sum = 0;
        newCategoriesForPieChart.push(category);

        for (const year in response.investments[category]) {
          for (const month in response.investments[category][year]) {
            for (const investmentId in response.investments[category][year][month]) {
              const investment = response.investments[category][year][month][investmentId];
              sum = sum + Number(investment.amount);
            }
          }
        }

        newDataForPieChart.push(sum);
      }

      setCategoriesForPieChart(newCategoriesForPieChart);
      setDataForPieChart(newDataForPieChart);

      if (response) {
        setPieChartData({
          labels: newCategoriesForPieChart,
          datasets: [
            {
              label: 'amount',
              data: newDataForPieChart,
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
      {response && pieChartData && <Pie data={pieChartData}></Pie>}
      <div  style={{
        
        padding: '15px',
        margin: '10px',
        width: '300px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        paddingLeft:"27px"
       
      }}
     >
        {response &&
        pieChartData &&
        categoriesForPieChart.map((category, index) => (
          <Card key={index} category={category} amount={dataForPieChart[index]}  ></Card>
        ))}

      </div>
      
    </>
  );
}
