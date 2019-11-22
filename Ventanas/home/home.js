/*
    Aqui estoy simulando el objeto USER con solo 4 valores básicos
*/
class User{
    constructor(n, a, m, c){
        this.nombre = n;
        this.apellido = a;
        this.correo = m;
        this.contraseña = c;
    }
}

let users = [];

let admin = new User('admin', 'admin', 'admin@admin.com', 'admin');
let user1 = new User('a', 'a', 'a@a.com', 'a');
users.push(admin);
users.push(user1);

/***********************************************************************************************/
/************************************     LOGIN       ******************************************/
let loginForm = document.querySelector('#loginForm').children[0];
let btnLogin = document.querySelector('.submitLogin > button');

btnLogin.addEventListener('click', () =>{
    event.preventDefault();
    if(checkLogin(loginForm[0].value, loginForm[1].value)){
        window.location.href = "dashboard.html"; // AQUI PONGAN LA URL DEL DASHBOARD
    }
    else
        alert('ERROR: Ingrese un correo/contraseña válido');
});

function checkLogin(correo, contraseña){
    var flag = false;
    users.forEach((user) => {
        if(userExists(correo) && user.contraseña == contraseña)
            flag = true;
    });
    return flag;
}
/*************************************************************************************************/
/************************************     REGISTRO      ******************************************/

let regForm = document.querySelector('.registro');
let btnSubmitReg = document.querySelector('.registro')[5];

regForm.addEventListener('change', () => {
    regForm[5].disabled = true;
    for(let i=0; i<4; i++){
        if(regForm[i].value == "")
            return;
    }
    if(validateEmail(regForm[2].value) && !userExists(regForm[2].value) && regForm[4].value == 'on')
        regForm[5].disabled = false;
});

regForm[5].addEventListener('click', () => {
    let newUser = new User(
        regForm[0].value,
        regForm[1].value,
        regForm[2].value,
        regForm[3].value
    );
    users.push(newUser);                         // NUEVO USUARIO A REGISTRAR (METODOD POST) ?
    window.location.href = "dashboard.html";    // AL DASHBOARD O PAG. DEL USUARIO
});

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
function userExists(correo){
    var flag = false;
    users.forEach((user) => {
        if(user.correo == correo)
            flag = true;
    });
    return flag;
}