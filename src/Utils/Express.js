// Your Express.js server
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(express.json());

app.post('http://localhost:3001/update-salary', (req, res) => {
  try {
    const incomeData = require('./Data/SourceOfIncome.json'); // Load the JSON file

    incomeData.incomeSources.forEach((incomeSource) => {
      if (incomeSource.name === 'Salary') {
        incomeSource.amount += 50000;
      }
    });

    // Write the updated data back to the JSON file
    fs.writeFileSync('./Data/SourceOfIncome.json', JSON.stringify(incomeData, null, 2));

    res.status(200).send('Salary updated successfully');
  } catch (error) {
    console.error('Error updating salary:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
