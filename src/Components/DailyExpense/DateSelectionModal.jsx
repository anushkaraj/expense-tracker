import React from "react";
import styles from "./DateSelectionModal.module.css";
import { RiCloseLine } from "react-icons/ri";
import InvestmentFilter from './DropDownOptions';

const DateSelectionModal = ({ isopen , setIsOpen,data,setnewData }) => {
 
const handleFilteredData=(newdata)=>{
    console.log(" in date sele",newdata);
setnewData(newdata);
}
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
           <InvestmentFilter data ={data} SendingfilteredData={handleFilteredData}></InvestmentFilter>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default DateSelectionModal;