import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Card from "./card";
import styles from './TravelExpenseChart.module.css';
import { Progress } from "./progressBar";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function InvestmentsChart(props) {
  const [pieChartData, setPieChartData] = useState(null);
  const [dataForPieChart, setDataForPieChart] = useState([]);
  const [categoriesForPieChart, setCategoriesForPieChart] = useState([]);
  const chartRef = useRef(null);
  const response = props.investmentdata;
  const[ budget,setbudget]=useState('');
  useEffect(() => {
    console.log("response is ", response);

    if (response) {
      setbudget(response.travelexpenses.budget);
      console.log("b",budget)
      const newDataForPieChart = [];
      const newCategoriesForPieChart = [];

      for (const category in response.travelexpenses) {
        if(category!='budget')
        {
          let sum = 0;
          newCategoriesForPieChart.push(category);
  
          for (const year in response.travelexpenses[category]) {
            for (const month in response.travelexpenses[category][year]) {
              for (const investmentId in response.travelexpenses[category][year][
                month
              ]) {
                const investment =
                  response.travelexpenses[category][year][month][investmentId];
                sum = sum + Number(investment.amount);
              }
            }
          }
  
          newDataForPieChart.push(sum);

        }
      
      }

      setCategoriesForPieChart(newCategoriesForPieChart);
      setDataForPieChart(newDataForPieChart);
      
     
    }
  }, [response]);
const totalexpense= dataForPieChart.reduce((acc, amount) => acc + amount, 0);
console.log(' new data for pie chart',budget);

  
  return (
    <>
      <div className={styles.progressBar} >
        <Progress budget={Number(budget)} totalexpense={totalexpense}></Progress>
      </div>
      <div
        style={{
          padding: "15px",
          margin: "10px",
          width: "300px",
          backgroundColor: "#fff",
          borderRadius: "8px",
         
          height: "280px",
          overflow: "scroll",
        }}
      >
        {response &&
         
          categoriesForPieChart.map((category, index) => (
            <Card
              key={index}
              category={category}
              amount={dataForPieChart[index]}
            ></Card>
          ))}
      </div>
    </>
  );
}
