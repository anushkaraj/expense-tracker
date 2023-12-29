import axios from "axios";
import React, { useState } from "react";
import styles from "./DeleteInvestment.module.css";
import { RiCloseLine } from "react-icons/ri";

const DeleteInvestment = ({date, investmentKey, show, onRequestClose ,investmentdeleted,handleNewData}) => {
   
    var category = sessionStorage.getItem("category");
    const year = date.substring(0,4);
    const handledeleteinvestment=async()=>{
        investmentdeleted(true);
        console.log(category,date,investmentKey)
           await axios.post('https://expense-backend-e411.onrender.com/investments/deleteRecord', {category,date,investmentKey})
      .then(response => {
       handleNewData(response.data.investments[category][year]);
        console.log('Delete Equity Record Success:', response.data.investments[category][year]);
      })
      .catch(error => {
        console.error('Delete Equity Record Error:', error);
      });
    }
  return (
    <>

     {show &&<div className={styles.darkBG} onClick={onRequestClose} />}
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={onRequestClose}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            Are you sure you want to delete the item?
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={handledeleteinvestment}>
                Delete
              </button>
              <button
                className={styles.cancelBtn}
                onClick={onRequestClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default DeleteInvestment;