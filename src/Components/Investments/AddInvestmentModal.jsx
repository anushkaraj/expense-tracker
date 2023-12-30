// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';
// import 'react-modal/style.css';

// const AddInvestmentModal = ({ isOpen, onRequestClose, onAddInvestment }) => {
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState('');
//   const [category, setCategory] = useState('');
//   const [newCategory, setNewCategory] = useState('');

//   const handleAddInvestment = () => {
//     // Perform validation or additional logic here if needed
//     const newInvestment = {
//       amount,
//       description,
//       date,
//       category,
//     };

//     // Call the parent component function to add the investment
//     onAddInvestment(newInvestment);

//     // Reset the form fields
//     setAmount('');
//     setDescription('');
//     setDate('');
//     setCategory('');
//     setNewCategory('');
//   };

//   const handleAddCategory = () => {
//     // Add logic to handle the addition of a new category
//     // For simplicity, let's assume you add it to a list
//     // You can also make an API call to add it to your backend
//     // For now, just updating the category state
//     setCategory(newCategory);
//     setNewCategory('');
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Add Investment Modal"
//     >
//       <h2>Add New Investment</h2>
//       <form>
//         <label>
//           Amount:
//           <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Description:
//           <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Date:
//           <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Category:
//           <select value={category} onChange={(e) => setCategory(e.target.value)}>
//             <option value="category1">Category 1</option>
//             <option value="category2">Category 2</option>
//             {/* Add other existing categories here */}
//           </select>
//         </label>
//         <br />
//         <label>
//           New Category:
//           <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
//         </label>
//         <button type="button" onClick={handleAddCategory}>Add Category</button>
//         <br />
//         <button type="button" onClick={handleAddInvestment}>Add Investment</button>
//       </form>
//     </Modal>
//   );
// };

// export default AddInvestmentModal;



// @src/components/Modal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AddInvestmentModal.module.css";
import { RiCloseLine } from "react-icons/ri";

const AddInvestmentModal = ({ isOpen, onRequestClose, categories,onDataRecieved ,handleAddedDatanow }) => {
  const [inputs, setInputs] = useState({});
  const [newdata,setnewdata]= useState(null);
   const [showaddcategory,setshowaddcategory]=useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleAddCategoryButton=(event)=>{
    event.stopPropagation();
    event.preventDefault();
    console.log(" clicked buuti");
    setshowaddcategory(true);
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    onRequestClose(false);
        onDataRecieved(true);
    // alert(JSON.stringify(inputs));
    // Reset inputs after submitting if needed
    setInputs({});
    // 'http://localhost:5000
    await axios.post('http://localhost:5000/investments/addRecord', inputs)
        .then(response => {
            setnewdata(response.data);
          console.log('Add Equity Record Success:', response.data);
          handleAddedDatanow(response.data);
        })
        .catch(error => {
          console.error('Add Equity Record Error:', error);
        })
        
       
  };
  


  return (
    <>
      {isOpen && <div className={styles.darkBG}  onClick={onRequestClose}/>}
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Add Investment</h5>
          </div>
          <button className={styles.closeBtn} onClick={onRequestClose}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="amount">Amount:</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={inputs.amount || ""}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={inputs.description || ""}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="category">Category:</label>
                
                <select
                  id="category"
                  name="category"
                  value={inputs.category || ""}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button  onClick={handleAddCategoryButton} className={styles.addCatgoryButton}>+</button>
                
              </div>
              {showaddcategory && (
        <div className={styles.formGroup}>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={inputs.category || ""}
            onChange={handleChange}
          />
        </div>
      )}
              <div className={styles.formGroup}>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={inputs.date || ""}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className={styles.submitbutton}>Add Investment</button>
            </form>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default AddInvestmentModal;
