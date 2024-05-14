const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const usernameDisplay = document.querySelector('#usernameDisplay');
usernameDisplay.textContent = `${loggedInUser.name}`;