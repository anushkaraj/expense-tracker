import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import TravelExpenseChart from './TravelExpenseChart';
import AddInvestmentModal from "./AddInvestmentModal";
import './Investments.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DateSelectionModal from './DateSelectionModal';


const MyContext=createContext();
const Miscellaneous = () => {
  
  const [data, setdata]=useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvestment,setnewInvestment]=useState(null);
  const [newInvestmentAdded, setnewInvestmentAdded]=useState(false);
  const [sharedData, setSharedData] = useState(null);
  const [isEditbudgetopen,setisEditbudgetopen]=useState(false);
  const [openDateModal,setopenDateModal]=useState(false);
  const [isDataFiltered,setIsDatafiltered]=useState();
  const DataFiltered= sessionStorage.getItem("MisDataFiltered");
  var FilteredData=sessionStorage.getItem("MisFilteredData");
  console.log("filtered data ",FilteredData)
  if(FilteredData!=="undefined")
  FilteredData  = JSON.parse(FilteredData);
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
  useEffect(()=>{
    setIsDatafiltered(sessionStorage.getItem("MisDataFiltered"));
  },[])

  const openDataselectionModal=()=>{
    setopenDateModal(true);
  }
  const handleNewData=(newdata)=>{
    console.log(" in handle newdata ",newdata)
    setdata(newdata);
    setopenDateModal(false);
   
  }

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
  const isEditModalOpen=()=>{
    setisEditbudgetopen(true);
  }
 const closeEditModal=()=>{
  setisEditbudgetopen(false);
 }
 const handleresetbuttonClicked=()=>{
  setIsDatafiltered(false);
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
    console.log(" is data filtered",typeof(sessionStorage.getItem("MisDataFiltered"))     )
  if(sessionStorage.getItem("MisDataFiltered")=='false')
   {
    axios.get('http://localhost:5000/miscellaneous/getCompleteData')
    .then(response => {
      setdata(response.data);
      console.log('I am called', response.data);

    })
    .catch(error => {
      console.error('Error fetching complete data:', error);
    });
   }else{
    setdata(FilteredData)
   }
    }
    
  ,[isDataFiltered]);
  var budget;
  var categories_array=[];
  if (data) {
  for (const category in data.miscellaneous ) {
    if(category ==='budget')
    window.localStorage.setItem('Mbudget', data.miscellaneous.budget);
      categories_array.push(category);
  }
}
 console.log(" categories is ",categories_array);
  return (  <MyContext.Provider value={{ sharedData, setSharedData }}>
     <div>
     <div style={{position:"absolute",marginLeft:"90%",marginTop:"-30px"}}> <FilterAltIcon onClick={openDataselectionModal}></FilterAltIcon></div>
      {openDateModal  && data && <DateSelectionModal open={openDateModal} setIsOpen={()=>setopenDateModal(false)} data={data.miscellaneous
} setnewData={handleNewData} resetbuttonclicked={handleresetbuttonClicked}></DateSelectionModal>}
      {!isModalOpen && !openDateModal &&
       <div >
       <TravelExpenseChart budget ={budget} investmentdata={data} isEditModalOpen={isEditModalOpen}closeEditModal={closeEditModal} ></TravelExpenseChart>
       
       <div style={{backgroundColor:"white",  position: isEditbudgetopen ? 'unset' : 'fixed',bottom: '25px',height:'40px', width: '100%', padding: '10px', textAlign: 'center',left: '-5.5%'  }}>
        <button
          style={{ backgroundColor: "#fef7e5", padding: "10px", fontWeight: 'bold', border: '2px solid black', borderRadius: '5px'}}
          onClick={() => { setIsModalOpen(true) }}
        >
          Add Expense
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

export default Miscellaneous;
