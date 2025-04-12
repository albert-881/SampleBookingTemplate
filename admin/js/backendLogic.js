export async function updateStatus(customerID, bookingID, status) {
    console.log(customerID, bookingID, status);
    try {
      const response = await fetch('https://7jznpwqy71.execute-api.us-east-2.amazonaws.com/default/updateStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerID, bookingID, status }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Server error:', data);
        alert(`Failed to update status: ${data.message || 'Unknown error'}`);
      } else {
        console.log('Status updated successfully:', data);
        
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error while updating status.');
    }
  }
  