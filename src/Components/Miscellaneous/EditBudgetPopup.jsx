// @src/components/Modal.jsx

import React from "react";
import styles from "./EditBudgetPopup.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";
const EditBudgetModal = ({ isopen ,setIsOpen ,isbudgetupdated, newbudget }) => {
    const [inputs, setInputs] = useState({});
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        setIsOpen(false);
        
        // alert(JSON.stringify(inputs));
        // Reset inputs after submitting if needed
        
        // 'http://localhost:5000
        console.log('in',inputs);
        await axios
          .post("http://localhost:5000/miscellaneous/updatebudgetamount", inputs)
          .then((response) => {
            isbudgetupdated(true);
            window.localStorage.setItem("Mbudget",inputs.newbudget)
            newbudget(inputs.newbudget);
            console.log("Add Equity Record Success:", response.data);
            
          })
          .catch((error) => {
            console.error("Add Equity Record Error:", error);
          });
      };
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Update Budget</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
          <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="newbudget">New Budget:</label>
                <input
                  type="text"
                  id="newbudget"
                  name="newbudget"
                  value={inputs.newbudget || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className={styles.submitbutton}>
               Update Budget
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default EditBudgetModal;