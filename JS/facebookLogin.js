// Carga el SDK de forma asíncrona--This code snippet loads the Facebook SDK JavaScript asynchronously. It also provides the JavaScript library which is used to render your Facebook login interface.

/*(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Inicializa el SDK de Facebook
window.fbAsyncInit = function() {
    FB.init({
        appId : '1298268964893456', // Reemplaza {your-app-id} con el ID de tu aplicación
        cookie : true, 
        xfbml : true, 
        version : 'v2.1' 
    });

    // Verifica el estado de inicio de sesión
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

// Maneja el cambio de estado de inicio de sesión
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log('¡Bienvenido! Obteniendo tu información.... ');
        FB.api('/me', function(response) {
            console.log('Inicio de sesión exitoso para: ' + response.name);
            document.getElementById('status').innerHTML =
            'Gracias por iniciar sesión, ' + response.name + '!';
        });
    } else if (response.status === 'not_authorized') {
        document.getElementById('status').innerHTML = 'Por favor, inicia sesión en esta aplicación.';
    } else {
        document.getElementById('status').innerHTML = 'Por favor, inicia sesión en Facebook.';
    }
}

// Verifica el estado de inicio de sesión cuando alguien termina con el botón de inicio de sesión
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}*/
// Configuración de Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId: '1298268964893456', // Reemplaza 'TU_APP_ID' con el ID de tu aplicación de Facebook
        cookie: true,
        xfbml: true,
        version: 'v16.0'
    });

    FB.AppEvents.logPageView();
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
    FB.login(function(response) {
        if (response.authResponse) {
            FB.api('/me?fields=id,first_name,last_name,email,picture.type(large)', function(response) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'index.php?facebook_user_data=' + encodeURIComponent(JSON.stringify(response)), true);
                xhr.send();
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        window.location.href = 'pages/dashboard/dashboard.html';
                    }
                };
            });
        } else {
            document.getElementById('status').innerHTML = 'Por favor, inicia sesión en Facebook.';
        }
    }, { auth_type: 'reauthenticate', scope: 'public_profile,email' });
}

function fbLogout() {
    FB.logout(function(response) {
        window.location.href = 'logout.php';
    });
}



