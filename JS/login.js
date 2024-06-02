import { getUsers } from './userManager.js';//Importamos la funcion para obtener usuarios
const loginForm = document.querySelector('#sumbit-login'); //Extraemos el formulario de login mediante su Id

//Evento de envio del formulario
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();//Evitamos la accion por defecto del formulario

    //Obtenemos los datos de usuario y contraseña ingresados en el formulario
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const users = getUsers();//Obtenemos los usuarios almacenados en localStorage

    //Se busca que el usuario y contraseña existan dentro del localStorage
    const user = users.find(u => u.username === username && u.password === password);

    console.log(user)

    if (user) {
        //Si existen el usuario y contraseña ingresados se muestra alerta de inicio de sesion exitoso y se redirige a la pagina principal
        alert('Inicio de sesión exitoso');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'https://inventrack.com/pages/dashboard/dashboard.html';
    } else {
        //Si el usuario y contraseña no existen se alerta al usuario
        alert('Usuario o contraseña incorrectos',);
    }
});
