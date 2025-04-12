import { updateStatus } from "./backendLogic.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Fetch the bookings initially
  const response = await fetch('https://8t699jt29g.execute-api.us-east-2.amazonaws.com/default/getBookings');
  const data = await response.json();
  let bookings = data.books;
  console.log(bookings);

  const bookingTable = document.getElementById("bookingTable");
  const statusFilter = document.getElementById("statusFilter");
  const sortBookings = document.getElementById("sortBookings");

  // Function to update the table with bookings
  function updateTable(bookingsToDisplay) {
    bookingTable.innerHTML = "";  // Clear the table before adding new rows

    bookingsToDisplay.forEach(booking => {
      const row = document.createElement("tr");

      // Convert eventTime from 24-hour format to 12-hour format
      const eventTime12hr = convertTo12HourFormat(booking.eventTime.S);

      row.innerHTML = `
        <td>${booking.eventDate.S}</td>
        <td>${booking.eventLocation.S}</td>
        <td>${eventTime12hr}</td>
        <td>${booking.package.S}</td>
        <td>
          <select class="status-select" data-booking-id="${booking.id}">
            <option value="pending" class="pending" ${booking.status.S === "pending" ? "selected" : ""}>Pending</option>
            <option value="confirmed" class="confirmed" ${booking.status.S === "confirmed" ? "selected" : ""}>Confirmed</option>
            <option value="completed" class="completed" ${booking.status.S === "completed" ? "selected" : ""}>Completed</option>
            <option value="canceled" class="canceled" ${booking.status.S === "canceled" ? "selected" : ""}>Canceled</option>
          </select>
        </td>
        <td>
          <div class="action-buttons">
            <button class="button">Edit</button>
            <button class="button delete-button">Delete</button>
          </div>
        </td>
      `;

      bookingTable.appendChild(row);

      const select = row.querySelector(".status-select");
      changeStatusColor(select);

      // Update color on change
      select.addEventListener("change", async function () {
        const newStatus = this.value;
        changeStatusColor(this);

        // Update the status in the backend
        await updateStatus(booking.customer_id.S, booking.booking_id.S, newStatus);

        // Re-fetch the updated bookings and refresh the table
        const response = await fetch('https://8t699jt29g.execute-api.us-east-2.amazonaws.com/default/getBookings');
        const data = await response.json();
        bookings = data.books;  // Update the local bookings array

        // Apply filter and sort after fetching new data
        applyFilterAndSort();
      });
    });
  }

  // Initially display all bookings
  updateTable(bookings);

  // Apply both filter and sort
  function applyFilterAndSort() {
    let filteredBookings = [...bookings];

    // Filter bookings by status
    const selectedStatus = statusFilter.value;
    if (selectedStatus !== "all") {
      filteredBookings = filteredBookings.filter(booking => booking.status.S === selectedStatus);
    }

    // Sort bookings by date
    const sortOrder = sortBookings.value;
    filteredBookings.sort((a, b) => {
      const dateA = new Date(a.eventDate.S);
      const dateB = new Date(b.eventDate.S);

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    // Update the table with the filtered and sorted bookings
    updateTable(filteredBookings);
  }

  // Filter bookings by status
  statusFilter.addEventListener("change", () => {
    applyFilterAndSort();
  });

  // Sort bookings by date
  sortBookings.addEventListener("change", () => {
    applyFilterAndSort();
  });
});

// Function to convert 24-hour time format to 12-hour time format
function convertTo12HourFormat(time24) {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;  // Convert 0 to 12 for midnight
  return `${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
}

// Function to change the background color of the status dropdown
function changeStatusColor(select) {
  const status = select.value;
  switch (status) {
    case 'pending':
      select.style.backgroundColor = 'yellow';
      break;
    case 'confirmed':
      select.style.backgroundColor = '#00FF00';
      break;
    case 'completed':
      select.style.backgroundColor = '#2196f3';
      break;
    case 'canceled':
      select.style.backgroundColor = '#ff4747';
      break;
    default:
      select.style.backgroundColor = 'white';
  }
}
