import axios from "axios";
import React, { useState } from "react";
import styles from "./DeleteInvestment.module.css";
import { RiCloseLine } from "react-icons/ri";

const DeleteInvestment = ({date, investmentKey, show, onRequestClose ,investmentdeleted,handleNewData,isdatadeleted}) => {
   
    var category = sessionStorage.getItem("categoryTripExpenses");
    const year = date.substring(0,4);
    const handledeleteinvestment=async()=>{
        investmentdeleted(true);
        console.log(category,date,investmentKey)
           await axios.post('http://localhost:5000/tripexpenses/deleteRecord', {category,date,investmentKey})
      .then(response => {
        if(response.data.tripexpenses && response.data.tripexpenses[category])
        handleNewData(response.data.tripexpenses[category][year]);
      else
      handleNewData(null);
       isdatadeleted(true);
        console.log('Delete Equity Record Success:');
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
            <h5 className={styles.heading}>Delete Expense</h5>
          </div>
          <button className={styles.closeBtn} onClick={onRequestClose}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            Are you sure you want to delete the expense?
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