$("#formSubmitLogin").on("submit", data => {
    let email = data.target[0].value//el usuario se encuentra en la posicion 0 del formulario
    if(email == ""){//si el usuario esta vacio
        return false
    }
    let password = data.target[1].value//la contraseña se encuentra en la posicion 1 del formulario
    if(password == ""){//si el usuario esta vacio
        return false
    }
    
    let dataAlert = $("#alert")//se crea una variable dataAlert que contiene la clase alert
    dataAlert[0].innerHTML = "";
    dataAlert.addClass("success");
    dataAlert.append("<p class'm-0'>Data process</p>");//se agrega un parrafo a la variable dataAlert
    dataAlert.append("<div class='charger'></div>");//se agrega un parrafo a la variable dataAlert

    if(true){//si el usuario y la contraseña no estan vacios 
        let dataUser = {//se crea un objeto con el usuario y la contraseña
            email: email, //user es igual al usuario que se ingreso en el formulario
            password: password
        }

        login(dataUser)//se llama a la funcion login y se le pasa el objeto dataUser
    }
})


function login (data){//la funcion login recibe un parametro data
    let dataAlert = $("#alert")
    $.ajax({
        method: "POST",
        url: "https://reqres.in/api/login",
        data: data,
        success: function (response) {//si la informacion es correcta
            setTimeout(function () {//setTimeout recibe una funcion -- se coloca un intervalo de 2 segundos
                dataAlert[0].innerHTML = "";//para que el mensaje de data process se remueva y aparezca data correcta
                dataAlert.removeClass("error");//va a remover los estilos de la clase error
                dataAlert.addClass("success");//va a agregar los estilos de la clase success
                dataAlert.append("<p class='m-0'>Data correcta</p>")
                // Redirigir después de mostrar el mensaje de alerta
                setTimeout(function () {
                    window.location.href = "../pages/dashboard/dashboard.html";
                }, 1000);
            },1000)
        },
    })
    .fail(function(response){//si la informacion es incorrecta
        setTimeout(function () {
            console.log(dataAlert[0].innerHTML="")//esto va a remover el mensaje de data process;
            dataAlert.innerHTML = "";
            dataAlert.removeClass("success");//va a remover los estilos de la clase sucess
            dataAlert.addClass("error");//va a agregar los estilos de la clase error
            dataAlert.append("<p class'm-0'>Data incorrecta</p>")//data correcta mensaje
        },2000)
    })
}
