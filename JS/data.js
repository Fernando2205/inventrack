//Inicialmente cree estos dos usuarios para probar que todo funcionara bien :D
const users = [{ name: 'Delio', lastName: 'Palacios', email: 'delio@correo.com', phoneNumber: '3101238877', username: 'delio05', password: 'password123' },
{ name: 'Dana', lastName: 'Rodriguez', email: 'dana@correo.com', phoneNumber: '1234567890', username: 'dana123', password: 'contra123' },
];

//Transformamos el objeto users a un string ya que local storage solo admite dos strings como parametros (clave y valor)
localStorage.setItem('users', JSON.stringify(users));