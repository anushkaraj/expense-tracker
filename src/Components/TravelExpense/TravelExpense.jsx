import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import TravelExpenseChart from './TravelExpenseChart';
import AddInvestmentModal from "./AddInvestmentModal";
import './Investments.css';
export const MyContext = createContext();
const TravelExpense = () => {
  const [data, setdata]=useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvestment,setnewInvestment]=useState(null);
  const [newInvestmentAdded, setnewInvestmentAdded]=useState(false);
  const [sharedData, setSharedData] = useState(null);
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  // // Sample data from React
  // const newEquityRecord = {
  //   category: 'liquid',
  //   year: '2023',
  //   month: 'January',
  //   amount: 20000,
  //   date: '2023-01-15',
  //   description: 'New Equity Investment',
  // };

  // const deleteEquityRecord = {
  //   category: 'liquid',
  //   year: '2023',
  //   month: 'January',
  //   investmentKey: 'investment4', // Replace with the actual investment key
  // };
  const handleAddInvestment = (newInvestment) => {
   setnewInvestment(newInvestment);
    setIsModalOpen(false);
  };
  const handleAddedDatanow=(newdata)=>{
    console.log(' in handle data');
    setdata(newdata);
  }

  // useEffect(() => {
  //   console.log("calling this ")
  //   // Add a new equity record
  //   axios.post('http://localhost:5000/travelexpenses/addRecord', newEquityRecord)
  //     .then(response => {
  //       console.log('Add Equity Record Success:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Add Equity Record Error:', error);
  //     })
  //   }, []);

  //   // Delete an equity record
  //   axios.post('http://localhost:5000/investments/deleteRecord', deleteEquityRecord)
  //     .then(response => {
  //       console.log('Delete Equity Record Success:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Delete Equity Record Error:', error);
  //     });

  //   // Fetch complete JSON data
    // axios.get('http://localhost:5000/investments/getCompleteData')
    //   .then(response => {
    //     console.log('Complete JSON Data:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching complete data:', error);
    //   });
  // }, []);
  
  useEffect(()=>{
    axios.get('http://localhost:5000/investments/getCompleteData')
      .then(response => {
        setdata(response.data);
        console.log('After addition of investmens:', response.data);

      })
      .catch(error => {
        console.error('Error fetching complete data:', error);
      });

  },[]);

  var categories_array=[];
  if (data) {
  for (const category in data.travelexpenses ) {
      categories_array.push(category);
  }
}
 console.log(" categories is ",categories_array);
  return (  <MyContext.Provider value={{ sharedData, setSharedData }}>
     <div>
      {!isModalOpen &&
       <div >
       <TravelExpenseChart investmentdata={data}></TravelExpenseChart>
       
       <div style={{backgroundColor:"white", position: 'fixed',bottom: '25px',height:'40px', width: '100%', padding: '10px', textAlign: 'center',left: '-5.5%'  }}>
        <button
          style={{ backgroundColor: "#fef7e5", padding: "10px", fontWeight: 'bold', border: '2px solid black', borderRadius: '5px'}}
          onClick={() => { setIsModalOpen(true) }}
        >
          Add Investment
        </button>
      </div>
      </div>
   
         
     }
    
       <div className='addInvestmentModal'>
       {isModalOpen && <AddInvestmentModal
       show={isModalOpen}
       onRequestClose={() => setIsModalOpen(false)}
       onAddInvestment={handleAddInvestment}
       categories={categories_array}
       onDataRecieved={()=>{setnewInvestmentAdded(true)}}
       handleAddedDatanow={handleAddedDatanow}


     />}
       </div>
       
     
   </div>
  </MyContext.Provider>
   
  );
};

export default TravelExpense;
