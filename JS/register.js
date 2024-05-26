import { registerUser } from './userManager.js';//Se importa la funcion de registro para poder utilizarla

const signupForm = document.querySelector("#sumbit-register");//Extraemos el formulario de registor mediante su Id

//Evento de envio del formulario
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();//Evitamos la accion por defecto del formulario

    //Obtenemos los datos de cada campo del formulario
    const name = document.querySelector("#name").value;
    const lastName = document.querySelector("#last-name").value;
    const email = document.querySelector('#email').value;
    const phoneNumber = document.querySelector('#phone-number').value;
    const username = document.querySelector('#create-user').value;
    const password = document.querySelector('#create-password').value;

    //Creamos un objeto para el usuario que vamos a agregar con los datos que extraimos del formulario
    const newUser = {
        name,
        lastName,
        email,
        phoneNumber,
        username,
        password
    };

    //Registramos al usuario (ya la funcion de registro implementa la funcion de validacion de usuario existente)
    const result = registerUser(newUser);

    if (result.success) {
        //Si el registro se pudo realizar informamos con una alerta y redirigimos a la página de login
        alert(result.message);
        window.location.href = 'https://inventrack.com';
        e.target.reset();
    } else {//En caso de que no se haya podido registrar el usuario mostramos el mensaje correspondiente
        alert(result.message);
    }
});