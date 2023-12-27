import logo from './logo.svg';
import './App.css';
import Navbar from './Components/NavBar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom"
import DailyExpense from './Components/DailyExpense/DailyExpense';
import Investmemts from "./Components/Investments/Investments";

function App() {
  return (
    <BrowserRouter>
     <Navbar></Navbar>
 <Routes>
  <Route
      exact
      path="/"
      element={<Investmemts />}
  />
  <Route
      exact
      path="/Travel_expense"
      element={<DailyExpense />}
  />
  <Route
      exact
      path="/contact"
      element={<DailyExpense />}
  />
</Routes>
     </BrowserRouter>
   
  
  );
}

export default App;
