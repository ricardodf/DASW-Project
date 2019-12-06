"use strict";

// Editar el nombre
let btnEditName = document.getElementById("guardarNombre");
let txtName = document.getElementById("nombreNuevo");
let nombre = document.getElementById("nombre");

btnEditName.disabled = true;

txtName.addEventListener("change", function(event) {
    if(txtName.value != "")
        btnEditName.disabled = false;
    else
        btnEditName.disabled = true;
});

btnEditName.addEventListener("click", function(event) {
    nombre.innerText = txtName.value;

});

// Editar el correo

function validar_email(email) 
{
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

let btnEditEmail = document.getElementById("guardarCorreo");
let txtEmail = document.getElementById("correoNuevo");
let email = document.getElementById("correo");

btnEditEmail.disabled = true;

txtEmail.addEventListener("change", function(event) {
    if(validar_email(txtEmail.value))
        btnEditEmail.disabled = false;
    else
        btnEditEmail.disabled = true;
});

btnEditEmail.addEventListener("click", function(event) {
    email.innerText = txtEmail.value;
});