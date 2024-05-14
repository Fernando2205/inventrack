import { registerUser } from './userManager.js';

const signupForm = document.querySelector("#sumbit-register");
const messagesDiv = document.querySelector("#alert-message"); // Asumiendo que tienes un elemento con el id "alert-message" para mostrar los mensajes

function showMessage(message, type) {
    messagesDiv.innerHTML = `<p class="${type}">${message}</p>`;
}

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const lastName = document.querySelector("#last-name").value;
    const email = document.querySelector('#email').value;
    const phoneNumber = document.querySelector('#phone-number').value;
    const username = document.querySelector('#create-user').value;
    const password = document.querySelector('#create-password').value;

    const newUser = {
        name,
        lastName,
        email,
        phoneNumber,
        username,
        password
    };

    const result = registerUser(newUser);
    if (result.success) {
        alert(result.message);
        window.location.href = '../login/login.html'


        e.target.reset();
    } else {
        alert(result.message);
    }
});