/***********************************************************************************************/
/************************************     LOGIN       ******************************************/
let loginForm = document.querySelector('#loginForm').children[0];
let btnLogin = document.querySelector('.submitLogin > button');

let newId;

btnLogin.addEventListener('click', () =>{
    event.preventDefault();
    getUser(loginForm[0].value, loginForm[1].value);
});

function getUser(correo, password){
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:3000/users?correo=${correo}&password=${password}`;
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200 && xhr.responseText != "[]"){
            var info = JSON.parse(xhr.responseText);
            loadSession(info[0].id);
        }
        else{
            alert('ERROR: El login no es correcto');
        }
    }
}

function loadSession(id){
    userID = {
        "sessionID": id
    };
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:3000/currentSession`;
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(userID));
    xhr.onload = function(){
        if(xhr.status == 200){
            window.location.href = "./Dashboard.html";
        }
        else{
            alert('ERROR: El login no es correcto');
        }
    }
}

/*************************************************************************************************/
/************************************     REGISTRO      ******************************************/

let regForm = document.querySelector('#regForm');
let regInputs = regForm.querySelectorAll('input');
let btnRegConfirmar = document.querySelector('#btnRegConfirmar');

btnRegConfirmar.disabled = true;

regForm.addEventListener('change', () => {
    btnRegConfirmar.disabled = true;
    var flag = true;
    regInputs.forEach((input) => {
        if(input.value == "")
            flag = false;
    });
    if(validateEmail(regInputs[2].value) && flag){
        getIdNewUser();
        btnRegConfirmar.disabled = false;
    }
        
});

btnRegConfirmar.addEventListener('click', () => {
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    var url = `http://localhost:3000/users?correo=${regInputs[2].value}`;
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function(){
        if(xhr.responseText == "[]"){
            let newUser = {
                "id": newId,
                "nombre": regInputs[0].value,
                "apellido": regInputs[1].value,
                "correo": regInputs[2].value,
                "password": regInputs[3].value,
                "listaMaterias": [],
                "listaExamen": [],
                "listaTareas": []
            };
            registerNewUser(newUser);
        }
        else{
            alert('Usuario Inválido');
        }
    }
});

function registerNewUser(user){
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/users";
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(user)]);
    xhr.onload = function(){
        if(xhr.status == 201){
            alert('Usuario registrado');
        }
        else
            alert(xhr.status+': '+xhr.statusText);
    }
}

function getIdNewUser(){
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:3000/users`;
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200){
            newId = JSON.parse(xhr.responseText).length+1;
        }
        else{
            alert('Error: '+JSON.parse(xhr.responseText));
        }
    }   
}
/*************************************************************************************************/
/************************************     ENVIAR CORREO    ***************************************/

let btnEnviarMail = document.querySelector('.btnEnviarMail');
btnEnviarMail.disabled = true;
let contactForm = document.querySelector('#contacto form');

contactForm.addEventListener('change', () => {
    btnEnviarMail.disabled = true;
    if(validateEmail(contactForm[0].value) && contactForm[1].value != ""){
        btnEnviarMail.disabled = false;
    }
});

function sendMail() {
    var link = "mailto:admin@DASW.com"
             + "?cc=company@DASW.com"
             + "&subject=" + escape("Mail de Contacto")
             + "&body=" + escape(contactForm[1].value)
    ;
    window.location.href = link;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}