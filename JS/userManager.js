
function getUsers() {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : initialUsers;
}

function validateRegistration(user) {
    const users = getUsers();
    const existingUser = users.find(u => u.username === user.username || u.email === user.email);
    if (existingUser) {
        return { success: false, message: 'El usuario o el correo electrónico ya están registrados!' };
    }
    return { success: true };
}

function registerUser(user) {
    const validationResult = validateRegistration(user);
    if (!validationResult.success) {
        return validationResult;
    }

    const users = getUsers();
    users.push(user);
    console.log(users)
    localStorage.setItem('users', JSON.stringify(users));
    console.log(localStorage.getItem("users"))
    return { success: true, message: 'Usuario registrado correctamente' };
}

export { getUsers, registerUser };