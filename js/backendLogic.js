export async function test(name, email, phone, dateVal, timeVal, eventVal, packageVal){
  try {
    const response = await fetch('https://ttnya8evdf.execute-api.us-east-2.amazonaws.com/default/test', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, phone  }),
    });
      
    let data = await response.json();
    console.log(data.message);
    putBooking(data.customer_id, dateVal, timeVal, eventVal, packageVal);
    }
    catch(err){

    }
}

export async function putBooking(currID, dateVal, timeVal, eventVal, packageVal) {
  console.log(currID, dateVal, timeVal, eventVal, packageVal);

  try {
    const response = await fetch('https://ma8bq0xgqa.execute-api.us-east-2.amazonaws.com/default/putBooking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currID, dateVal, timeVal, eventVal, packageVal }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    let data = await response.json();
    console.log('Response Data: ', data.message);
  } catch (err) {
    console.error('Error in putBooking:', err.message || err);
  }
}

export async function sendEmail(nameVal, emailVal, phoneVal, dateVal, timeVal, eventVal, packageVal) {
  try {
    const response = await fetch('https://your-api-gateway-url/sendEmail', {  // Replace with your API Gateway URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nameVal, emailVal, phoneVal, dateVal, timeVal, eventVal, packageVal}),
    });

    let data = await response.json();
    console.log("Email Response:", data);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
