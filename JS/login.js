import { getUsers } from './userManager.js';
const loginForm = document.querySelector('#sumbit-login');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Inicio de sesión exitoso');
        window.location.href = '../pages/dashboard/dashboard.html'
    } else {
        alert('Usuario o contraseña incorrectos',);
    }
});