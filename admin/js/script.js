document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Convert password to an ArrayBuffer
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    // Hash the password using SHA-256
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', passwordBuffer);

    // Convert the ArrayBuffer to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    console.log(hashedPassword);

    // Proceed with login
    sessionStorage.setItem('isAdmin', 'true');
    //window.location.href = 'adminDashboard.html';  // Redirect to the admin dashboard
  });
});
