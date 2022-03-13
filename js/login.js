window.onload = function () {
    let isSessionStart = leerCookie("sessionLoginWorker") ==='true'
    if (isSessionStart) {
        window.location.href = `/dashboard.html`
    } else {
        initializeComponentsLogin()
    }
}

function initializeComponentsLogin() {
    document.getElementById('main-card-btn-login').addEventListener('click', () => {
        validateFields()
    })
}

function leerCookie(nombre) {
    let lista = document.cookie.split(";");
    for (i in lista) {
        let busca = lista[i].search(nombre);
        if (busca > -1) { micookie = lista[i] }
    }
    let igual = micookie.indexOf("=");
    let valor = micookie.substring(igual + 1);
    return valor;
}

function validateFields() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    if (email.length == 0 || password.length == 0) {
        showMessage("The fields cannot be empty", document.getElementById('login-form'), false, true)
    } else {
        showMessage("", "", "", false)
        document.cookie = `sessionLoginWorker=${true}`
        document.cookie = `sessionUserEmail=${email}`
        document.cookie = `sessionUserPassword=${password}`
        window.location.href = `/dashboard.html`
    }

}

function showMessage(text, mainContent, isNotError, isVisible) {

    if (isVisible) {
        if (isNotError) {
            if (!document.getElementById('login-success-message')) {
                let alertSuccess = document.createElement("div");
                let iconSuccess = document.createElement("i");
                let spanSuccess = document.createElement("span");

                alertSuccess.id = "login-success-message"
                spanSuccess.innerText = `${text}`;

                alertSuccess.classList.add("alert", "alert-success");
                iconSuccess.classList.add("fas", "fa-check-circle");

                mainContent.appendChild(alertSuccess)
                alertSuccess.appendChild(iconSuccess);
                alertSuccess.appendChild(spanSuccess);
            }
        } else {

            if (!document.getElementById('login-error-message')) {
                let alertError = document.createElement("div");
                let iconError = document.createElement("i");
                let spanError = document.createElement("span");

                alertError.id = "login-error-message"
                spanError.innerText = `${text}`;

                alertError.classList.add("alert", "alert-Error");
                iconError.classList.add("fas", "fa-exclamation-circle");

                mainContent.appendChild(alertError)
                alertError.appendChild(iconError);
                alertError.appendChild(spanError);
            }
        }
    } else {
        if (document.getElementById('login-success-message')) {
            let messageEmpty = document.getElementById('login-success-message')
            messageEmpty.style.setProperty('visibility', 'hidden');
        }
        if (document.getElementById('login-error-message')) {
            let messageEmpty = document.getElementById('login-error-message')
            messageEmpty.style.setProperty('visibility', 'hidden');
        }
    }

}