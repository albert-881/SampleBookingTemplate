import { test } from "./backendLogic.js";
import { sendEmail } from "./backendLogic.js";

const bookingForm = document.querySelector('#booking-form');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const dateInput = document.querySelector('#date');
    const timeSelect = document.querySelector('#time');
    const eventLoc = document.querySelector('#loc');
    const packageSelect = document.querySelector('#package');

    let nameVal = nameInput.value;
    let emailVal = emailInput.value;
    let phoneVal = phoneInput.value;
    let dateVal = dateInput.value;
    let timeVal = timeSelect.value;
    let eventVal = eventLoc.value;
    let packageVal = packageSelect.value;


    
    await test(nameVal, emailVal, phoneVal, dateVal, timeVal, eventVal, packageVal);
    
    //this will be used until the very end once the project is complete and owner approves. need to purchase domain.
    //await sendEmail(nameVal, emailVal, phoneVal, dateVal, timeVal, eventVal, packageVal)
});

window.addEventListener('DOMContentLoaded', async () => {
    const dateInput = document.querySelector('#date');
  
    try {
      // Fetch the list of booked dates from your API
      const response = await fetch('https://behqi9esz5.execute-api.us-east-2.amazonaws.com/default/getBookedDates');
      const data = await response.json();
      const bookedDates = data.dates;
  
      // Log the booked dates to check the structure
      console.log(bookedDates);
  
      // Map the booked dates to an array of date strings (assuming eventDate.S holds the date)
      const disableDates = bookedDates.map(item => item.eventDate.S);
  
      // Log disableDates to verify correct data
      console.log('Disable Dates:', disableDates);

      // Initialize flatpickr with the booked dates
      flatpickr("#date", {
        disable: disableDates,  // Disable the booked dates
        minDate: "today",       // Disable past dates
        dateFormat: "Y-m-d",    // Format the date (adjust as needed)
      });
  
    } catch (err) {
      console.error('Could not load booked dates:', err);
    }
});

  
  