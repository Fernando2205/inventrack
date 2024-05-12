$("#formSubmitRegister").on("submit", data => {//espera a que el formulario con el id formSubmitRegister sea enviado
    //$("#formSubmitRegister") es una selección de jQuery que busca un el id formSubmitRegister
    //se esta colocando un controlador al evento "submit" del formulario, cada vez que se dispare se va a ejecutar la funcion => que recibe los valres data
    let username = $("#create-user").val();//colocar el nombre que se ingrese en usuario en el dashbqrd
    console.log(username);
    // Guardar el nombre de usuario en el almacenamiento local
    localStorage.setItem("username", username);

    let email = data.target[2].value//el email se encuentra en la posicion 2 del formulario
    if(email == ""){//si el email esta vacio
        return false
    }
    let password = data.target[5].value//la contraseña se encuentra en la posicion 5 del formulario
    if(password == ""){
        return false
    }
    let dataAlert = $("#alert")//se crea una variable dataAlert que contiene el id alert
    dataAlert[0].innerHTML = "";//esta limpiando el contenido html del elemento
    dataAlert.addClass("success");//agregamos la clase sucess
    dataAlert.append("<p class'm-0'>Procesando registro</p>");//se agrega un parrafo a la variable dataAlert
    dataAlert.append("<div class='charger'></div>");//se agrega un parrafo a la variable dataAlert

    if(true){//si el usuario y la contraseña no estan vacios 
        let dataUser = {//se crea un objeto con el usuario y la contraseña
            email: email, //email es igual al usuario que se ingreso en el formulario
            password: password
        }

        register(dataUser)//se llama a la funcion register y se le pasa el objeto dataUser
    }
});
function register(data){
    let dataAlert = $("#alert")

    // Verificar si tanto el correo electrónico como la contraseña son correctos
    if (data.email && data.password) {//data.email=el correo en la API,si se ingresan los datos correctos 
        $.ajax({//la funcion $.ajax llama AJAX, la cual va a hacer una solicitud POST la url de la API, lso datos recibidos son el email y la contraseña 
            method: "POST",
            url: "https://reqres.in/api/register",
            data: data,
            success: function (response) {//sucess --- propiedad que se utiliza para verificar si la solicitud AJAX recibe una respesta del servidor sin errores
                setTimeout(function () {//se establece un temporizador de 2 segundos (lo que se demorara el mensaje en aparecer)
                    dataAlert[0].innerHTML = "";
                    dataAlert.removeClass("error");// va a remover los estilos de la clase error
                    dataAlert.addClass("success"); // va a agregar los estilos de la clase success
                    dataAlert.append("<p class='m-0'>Registro correcto</p>")
                    // Redirigir después de mostrar el mensaje de alerta
                    setTimeout(function () {
                        window.location.href = "../login/login.html";
                    }, 2000);
                },2000)
            },
        })
        // Si la solicitud AJAX falla -- si la API devuelve un error),
        .fail(function(response){
            setTimeout(function () {//se establece un temporizador de 2 segundos          
                dataAlert.removeClass("success");// se elimina la clase "success" del elemento dataAlert,        
                dataAlert.addClass("error");// se agrega la clase "error" al elemento dataAlert,
                dataAlert.append("<p class='m-0'>Registro incorrecto</p>")// y se agrega un nuevo párrafo con el texto "Data incorrecta" al elemento dataAlert.
            // Todo esto sucede después de los 2 segundos especificados.
            },2000)
        })
        // si los datos del formulario no son válidos),
        } else {
            setTimeout(function () {
                
                dataAlert.removeClass("success");//quita los estilos de la clase succeess
                dataAlert.addClass("error");// se agrega la clase "error" al elemento dataAlert,
                dataAlert.append("<p class='m-0'>Registro incorrecto</p>")                // y se agrega un nuevo párrafo con el texto "Data incorrecta" al elemento dataAlert.

            // Todo esto sucede después de los 2 segundos especificados.
            },2000)
        }
    }

window.addEventListener('load', function(){
    alert("Solo puedes registrarte con estos datos\nEmail:eve.holt@reqres.in\nContraseña:pistol");
  });