import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputNumbers, setInputNumbers] = useState('');
  const [resultNumbers, setResultNumbers] = useState([]);

  const handleInputChange = (e) => {
    setInputNumbers(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://expense-backend-e411.onrender.com/processNumbers', {
        numbers: inputNumbers.split(',').map(Number),
      });

      setResultNumbers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Enter numbers (comma-separated):
          <input type="text" value={inputNumbers} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {resultNumbers.length > 0 && (
        <div>
          <h2>Result:</h2>
          <p>{resultNumbers.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
