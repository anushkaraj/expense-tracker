// SalaryIncrement.js
const updateSalary = async () => {
  try {
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
   
    if (currentDate.getDate() === lastDayOfMonth) {
      // It's the last day of the month, update salary
      const response = await fetch('http://localhost:3002/update-salary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Salary updated successfully.');
      } else {
        console.error('Failed to update salary.');
      }
    } else {
      console.log('Not the last day of the month. Salary remains unchanged.');
    }
  } catch (error) {
    console.error('Error updating salary:', error.message);
  }
};

export default updateSalary;
