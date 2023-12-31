import React, { useState, useEffect } from "react";
import styles from "./DateSelectionModal.module.css";
const InvestmentFilter = ({ data ,SendingfilteredData}) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredData, setFilteredData] = useState({});
  const [distinctYears, setDistinctYears] = useState([]);
 
  useEffect(() => {
    // Populate the initial year dropdown
    const allYears = getDistinctYears();
    setDistinctYears(allYears);
    updateDropdown("yearDropdown", allYears);
  }, []);

  useEffect(() => {
    // Update months and dates when the selected year changes
    updateMonthsAndDates();
  }, [selectedYear]);

  useEffect(() => {
    // Update dates when the selected month changes
    updateDatesDropdown();
  }, [selectedMonth]);

  useEffect(() => {
    // Update filtered data when any dropdown changes
    updateFilteredData();
  }, [selectedYear, selectedMonth, selectedDate]);

  function filterData(year, month, date) {
    let filterDatanew={};
    let distinctYears = [];
    let distinctMonths = [];
    let distinctDates = [];

    for (const category in data) {
      for (const y in data[category]) {
        if (
          category !== "budget" &&
          category !== "currentmonth" &&
          category !== "currentyear"
        ) {
          if (year && y !== year) continue;
          if (!distinctYears.includes(y)) {
            distinctYears.push(y);
          }

          for (const m in data[category][y]) {
            if (month && m !== month) continue;
            if (!distinctMonths.includes(m)) {
              distinctMonths.push(m);
            }

            for (const investment in data[category][y][m]) {
              const investmentDate = data[category][y][m][investment].date;
              if (date && investmentDate !== date) continue;
              if (!distinctDates.includes(investmentDate)) {
                distinctDates.push(investmentDate);
              }

              if (!filterDatanew[category]) {
                filterDatanew[category] = {};
              }
              if (!filterDatanew[category][y]) {
                filterDatanew[category][y] = {};
              }
              if (!filterDatanew[category][y][m]) {
                filterDatanew[category][y][m] = {};
              }
              filterDatanew[category][y][m][investment] =
                data[category][y][m][investment];
            }
          }
        }
      }
    }
    
    return { filterDatanew, distinctYears, distinctMonths, distinctDates };
  }

  function getDistinctYears() {
    let distinctYears = [];

    for (const category in data) {
      for (const y in data[category]) {
        if (
          category !== "budget" &&
          category !== "currentmonth" &&
          category !== "currentyear"
        ) {
          if (!distinctYears.includes(y)) {
            distinctYears.push(y);
          }
        }
      }
    }

    return distinctYears;
  }

  function getDistinctMonthsByYear(selectedYear) {
    let distinctMonths = [];

    for (const category in data) {
      if (
        category !== "budget" &&
        category !== "currentmonth" &&
        category !== "currentyear"
      ) {
        for (const y in data[category]) {
          if (selectedYear && y !== selectedYear) continue;

          for (const m in data[category][y]) {
            if (!distinctMonths.includes(m)) {
              distinctMonths.push(m);
            }
          }
        }
      }
    }

    return distinctMonths;
  }

  function getDistinctDatesByYearAndMonth(selectedYear, selectedMonth) {
    let distinctDates = [];

    for (const category in data) {
      if (
        category !== "budget" &&
        category !== "currentmonth" &&
        category !== "currentyear"
      ) {
        for (const y in data[category]) {
          if (selectedYear && y !== selectedYear) continue;

          for (const m in data[category][y]) {
            if (selectedMonth && m !== selectedMonth) continue;

            for (const investment in data[category][y][m]) {
              const investmentDate = data[category][y][m][investment].date;
              if (!distinctDates.includes(investmentDate)) {
                distinctDates.push(investmentDate);
              }
            }
          }
        }
      }
    }

    return distinctDates;
  }

  function updateDropdown(selectId, options) {
    const dropdown = document.getElementById(selectId);
    dropdown.innerHTML = ""; // Clear existing options

    // Add "All" option
    const allOption = document.createElement("option");
    allOption.value = "";
    allOption.textContent = "All";
    dropdown.appendChild(allOption);

    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      dropdown.appendChild(optionElement);
    });
  }

  function updateMonthsAndDates() {
    const selectedYear = document.getElementById("yearDropdown").value;
    const distinctMonths = getDistinctMonthsByYear(selectedYear);
    updateDropdown("monthDropdown", distinctMonths);

    // Update date dropdown
    updateDatesDropdown();

    updateFilteredData();
  }

  function updateDates() {
    // Update date dropdown
    updateDatesDropdown();

    updateFilteredData();
  }

  function updateDatesDropdown() {
    const selectedYear = document.getElementById("yearDropdown").value;
    const selectedMonth = document.getElementById("monthDropdown").value;
    const distinctDates = getDistinctDatesByYearAndMonth(
      selectedYear,
      selectedMonth
    );
    updateDropdown("dateDropdown", distinctDates);
  }

  function updateFilteredData() {
    const selectedYear = document.getElementById("yearDropdown").value || null;
    const selectedMonth =
      document.getElementById("monthDropdown").value || null;
    const selectedDate = document.getElementById("dateDropdown").value || null;
    setFilteredData({})
    console.log("is",filteredData)
    const { filterDatanew } = filterData(
      selectedYear,
      selectedMonth,
      selectedDate
    );
    console.log("sdfa",filterDatanew)
    setFilteredData(filterDatanew)
    const filteredDataContainer = document.getElementById("filteredData");
    filteredDataContainer.textContent = JSON.stringify(filterDatanew, null, 2);
  }
  function handlesubmit(e)
  {
    e.preventDefault()
    console.log("fil",filteredData);
    var finaloutput={}
    finaloutput["monthlyexpenses"]=filteredData;
    SendingfilteredData(finaloutput);
  }
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="yearDropdown">Select year :</label>
          <select
            id="yearDropdown"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="monthDropdown">Select month :</label>
          <select
            id="monthDropdown"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date"> Select Date:</label>
          <select
            id="dateDropdown"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">All Dates</option>
          </select>
        </div>
         <div id="filteredData">{JSON.stringify(filteredData, null, 2)}</div>
        <button type="submit" className={styles.submitbutton} >
          Add Investment
        </button>
      </form>

     
    </div>
  );
};

export default InvestmentFilter;
