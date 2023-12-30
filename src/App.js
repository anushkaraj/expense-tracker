import logo from './logo.svg';
import './App.css';
import Navbar from './Components/NavBar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom"
import DailyExpense from './Components/DailyExpense/DailyExpense';
import Investmemts from "./Components/Investments/Investments";
import CategoryDetailsInvestment from './Components/Investments/CategoryDetails';
import { useEffect } from 'react';
import TravelExpense from './Components/TravelExpense/TravelExpense'
import CategoryDetailsTravelExpense from './Components/TravelExpense/CategoryDetailsTravelExpense';
import TripExpense from './Components/TripExpenses/TripExpense';
import CategoryDetailsTripExpense from './Components/TripExpenses/CategoryDetailsTripExpense'
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
   <Route path="/category/Investments" element={<CategoryDetailsInvestment />} />
   <Route path="/category/TravelExpense" element={<CategoryDetailsTravelExpense />} />
   <Route path="/category/TripExpense" element={<CategoryDetailsTripExpense />} />
  <Route
      exact
      path="/Travel_expense"
      element={<TravelExpense />}
  />
  <Route
      exact
      path="/Trip_expense"
      element={<TripExpense />}
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
// if (data) {
//   for (const category in data.investments) {
//     if (category === category_from_storage) {
//       for (const year in data.investments[category]) {
//         for (const month in data.investments[category][year]) {
//           for (const investmentId in data.investments[category][year][month]) {
//             const investment = data.investments[category][year][month][investmentId];
//             data_for_printing.push(investment);
//           }
//         }
//       }
//     }
//   }
// }