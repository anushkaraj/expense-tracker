import React, { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


// ... (import statements)

export default function InvestmentsChart() {
  const [response, setResponse] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await axios.get('http://localhost:3000/investments');
        console.log('Investments result is', apiResponse);
        setResponse(apiResponse);
      } catch (error) {
        console.log('error is', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    var data_for_pie_chart = [];
    console.log('response is ', response);
    if (response?.data) {
      for (let i in response.data) {
        for (let j in response.data[i]) {
          var sum = 0;
          for (let k in response.data[i][j]) {
            sum = sum + response.data[i][j][k].amount;
          }
          data_for_pie_chart.push(sum);
          console.log(data_for_pie_chart);
        }
      }
      setPieChartData({
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
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
  }, [response]);

  return (
    <>
      {response && response?.data && pieChartData && <Pie data={pieChartData}></Pie>}
    </>
  );
}
