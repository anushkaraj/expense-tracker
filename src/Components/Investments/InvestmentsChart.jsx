import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Card from "./card";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function InvestmentsChart(props) {
  const [pieChartData, setPieChartData] = useState(null);
  const [dataForPieChart, setDataForPieChart] = useState([]);
  const [categoriesForPieChart, setCategoriesForPieChart] = useState([]);
  const chartRef = useRef(null);
  const response = props.investmentdata;

  useEffect(() => {
    console.log("response is ", response);

    if (response) {
      const newDataForPieChart = [];
      const newCategoriesForPieChart = [];

      for (const category in response.investments) {
        let sum = 0;
        newCategoriesForPieChart.push(category);

        for (const year in response.investments[category]) {
          for (const month in response.investments[category][year]) {
            for (const investmentId in response.investments[category][year][
              month
            ]) {
              const investment =
                response.investments[category][year][month][investmentId];
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
              label: "amount",
              data: newDataForPieChart,
              backgroundColor: [
                "rgba(255, 170, 170, 0.7)", // Light Red
                "rgba(135, 206, 250, 0.7)", // Light Sky Blue
                "rgba(255, 229, 122, 0.7)", // Light Yellow
                "rgba(144, 238, 144, 0.7)", // Light Green
                "rgba(187, 150, 255, 0.7)", // Light Purple
                "rgba(255, 182, 128, 0.7)", // Light Orange
                "rgba(255, 201, 220, 0.7)", // Light Pink
                "rgba(255, 153, 173, 0.7)", // Light Salmon
                "rgba(140, 133, 173, 0.7)", // Light Slate Blue
                "rgba(205, 133, 173, 0.7)", // Light Medium Purple
                "rgba(255, 190, 160, 0.7)", // Light Coral
                "rgba(170, 214, 194, 0.7)", // Light Sea Green
                "rgba(144, 238, 144, 0.7)", // Light Green
                "rgba(250, 128, 114, 0.7)", // Light Salmon
                "rgba(173, 216, 230, 0.7)", // Light Blue
                "rgba(152, 251, 152, 0.7)", // Pale Green
                "rgba(255, 183, 77, 0.7)", // Light Goldenrod
                "rgba(70, 130, 180, 0.7)", // Steel Blue
                "rgba(255, 221, 102, 0.7)", // Light Goldenrod Yellow
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 169, 209, 1)",
                "rgba(255, 82, 112, 1)",
                "rgba(40, 33, 92, 1)",
                "rgba(133, 33, 92, 1)",
                "rgba(200, 120, 50, 1)",
                "rgba(80, 160, 120, 1)",
                "rgba(10, 200, 100, 1)",
                "rgba(220, 20, 60, 1)",
                "rgba(70, 130, 180, 1)",
                "rgba(255, 0, 255, 1)",
                "rgba(0, 128, 0, 1)",
                "rgba(255, 165, 0, 1)",
                "rgba(0, 0, 128, 1)",
                "rgba(255, 215, 0, 1)",
              ],

              borderWidth: 1,
            },
          ],
        });
      }
    }
  }, [response]);

  const chartContainerStyle = {
   left:"13%",
    width: "270px", // Set the desired width
    height: "270px", // Set the desired height
  }; 
  return (
    <>
      <div style={{ ...chartContainerStyle, position: "relative" }}>
        {response && pieChartData && (
          <>
            <Doughnut ref={chartRef} data={pieChartData}></Doughnut>
            <div
              style={{
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "#000", // Customize the color
                fontSize: "15px",
                fontWeight:"bold" // Customize the font size
              }}
            >
              Amount
               <br></br>
               ₹{dataForPieChart.reduce((acc, amount) => acc + amount, 0)}
            </div>
          </>
        )}
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
          pieChartData &&
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
