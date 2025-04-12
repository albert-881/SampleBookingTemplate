if (sessionStorage.getItem('isAdmin') === 'true') {
    console.log('approved');
} else {
    alert('You need to login first');
    window.location.href = 'adminLogin.html';  // Redirect to login page
}
