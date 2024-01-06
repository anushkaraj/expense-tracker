import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Card from "./card";
import styles from './TravelExpenseChart.module.css';
import { Progress } from "./progressBar";
import CircleIcon from '@mui/icons-material/Circle';
import EditIcon from '@mui/icons-material/Edit';
import EditBudgetModal from './EditBudgetPopup';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function InvestmentsChart({investmentdata,isEditModalOpen,closeEditModal}) {
  const [pieChartData, setPieChartData] = useState(null);
  const [dataForPieChart, setDataForPieChart] = useState([]);
  const [categoriesForPieChart, setCategoriesForPieChart] = useState([]);
  const chartRef = useRef(null);
  const response = investmentdata;
  const[ budget,setbudget]=useState('');
  const [openEditModal, setopenEditModal]=useState(false);
  const [budgetupdated , setbudgetupdated]=useState(false);
  const handleEditBudget=()=>{
    isEditModalOpen(true);
    setopenEditModal(true);
  }
  const isbudgetupdated=()=>{
    closeEditModal(true);
    setbudgetupdated(true);
  }
  const updateBudget=(newbudget)=>{
    setbudget(newbudget);
  }
  const closeModel=()=>{
    setopenEditModal(false);
     closeEditModal(true);
  }
  useEffect(() => {
    console.log("response is ", response);
if(response && response.miscellaneous && response.miscellaneous.budget)
{
  setbudget(response.miscellaneous.budget);
      console.log("b",budget)
}
else
{
  setbudget(window.localStorage.getItem("Mbudget"))
}
    if (response) {
      
      const newDataForPieChart = [];
      const newCategoriesForPieChart = [];

      for (const category in response.miscellaneous) {
        if(category!='budget'&& category!='currentyear'&& category!='currentmonth')
        {
          let sum = 0;
          newCategoriesForPieChart.push(category);
  
          for (const year in response.miscellaneous[category]) {
            for (const month in response.miscellaneous[category][year]) {
              for (const investmentId in response.miscellaneous[category][year][
                month
              ]) {
                const investment =
                  response.miscellaneous[category][year][month][investmentId];
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
  }, [response,budgetupdated]);
const totalexpense= dataForPieChart.reduce((acc, amount) => acc + amount, 0);
console.log(' new data for pie chart',budget);

  
  return (
    <>
  
      
      <div className={styles.progressBar} >
      <Progress budget={Number(budget)} totalexpense={totalexpense}></Progress>
    </div>
    <div style={{display:"flex",flexDirection:"column",marginLeft:'15%'}}>
    <div className={styles.circleandp} >
        <CircleIcon fontSize="10px"  ></CircleIcon>
        <p className={styles.ptags}>Total Budget  :  ₹{Number(budget)}</p>
        <div style={{marginLeft:"15px", marginTop:"-3px"}}> <EditIcon fontSize="10px" onClick={handleEditBudget}></EditIcon></div>
       
        </div>
        <div className={styles.circleandp}> <CircleIcon fontSize="10px" sx={{ color: "#32cd32" }} ></CircleIcon>
        <p className={styles.ptags}>Remaining Budget :  ₹{Number(budget)-totalexpense}</p>
        </div> 
        <div className={styles.circleandp} >
        <CircleIcon fontSize="10px"  sx={{ color: "#FF0000" }}></CircleIcon>
        <p className={styles.ptags}>Spend :  ₹{totalexpense}</p>
        </div>
         
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
            datatoshow={response.miscellaneous}
          ></Card>
        ))}
    </div>
   {openEditModal&& <EditBudgetModal isopen={openEditModal} setIsOpen={closeModel} isbudgetupdated={isbudgetupdated} newbudget={updateBudget}></EditBudgetModal>}
   
    </>
  );
}
