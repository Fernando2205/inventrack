//En este archivo se maneja logica relacionada con el manejo de usuarios

//Funcion para obtener el string de los usuarios almacenados en localStorage y transformarlo a un objeto(Retorna el objeto)
function getUsers() {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : initialUsers;
}

//Funcion para validar el registro de un usuario (recibe como parametro un objeto con la informacion del usuario)
function validateRegistration(user) {
    const users = getUsers(); //obtiene los usuarios que hay almacenados en localStorage
    const existingUser = users.find(u => u.username === user.username || u.email === user.email);//validacion de usuario existente
    if (existingUser) {
        return { success: false, message: 'El usuario o el correo electrónico ya están registrados!' };
    }//si el usuario existe va a retornar como propiedades success como false y un mensaje de error
    return { success: true };//si el usuario no existe retorna la propiedad success como true
}

//funcion para registrar usuario
function registerUser(user) {
    const validationResult = validateRegistration(user);//realiza la validacion llamando a la funcion anterior
    if (!validationResult.success) {
        return validationResult; //si la validacion no fue exitosa retorna la variable de entrada con las propiedades succes y mensaje de error incluidas
    }
    //si no hay problemas de validacion
    const users = getUsers();//se guarda en una variable los usuarios existentes
    users.push(user);//se agrega a los usuarios existentes el usuario nuevo(objeto con los datos del usuario)
    localStorage.setItem('users', JSON.stringify(users)); //se almacenan los usuarios actualizados al localStorage
    return { success: true, message: 'Usuario registrado correctamente' };//retorna succes como true y un mensaje de registor exitoso
}

export { getUsers, registerUser };//Se exportan las funciones para poder usarlas en otros archivos javascript