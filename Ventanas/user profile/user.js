"use strict";
///////////// Editar información /////////////////////////
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

// Editar el apellido
let btnEditLastName = document.getElementById("guardarApellido");
let txtLastName = document.getElementById("apellidoNuevo");
let apellido = document.getElementById("apellido");

btnEditLastName.disabled = true;

txtLastName.addEventListener("change", function(event) {
    if(txtLastName.value != "")
        btnEditLastName.disabled = false;
    else
        btnEditLastName.disabled = true;
});

btnEditLastName.addEventListener("click", function(event) {
    apellido.innerText = txtLastName.value;

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


/////////// Nueva materia //////////////////

let hora = document.getElementsByName("hora");
let materia = {}; // Guardará toda la información de la materia nueva

//seleccionar todos los checkbox que estan adentro de un div con id = ModalNuevaMateria
let dias = document.querySelectorAll("input[type=\"checkbox\"]");

let nuevaClase;

let btnNuevaMateria = document.getElementById("guardarMateria");
let nombreMateria = document.getElementById("nombreMateria");
let nombreProfesor = document.getElementById("nombreProfesor");
let correoProfesor = document.getElementById("correoProfesor");
let salon = document.getElementById("salon");

let listaDeMaterias = document.getElementById("clases");

// Flags for validations
let materiaIsValid = 0;
let profesorIsValid = 0;
let correoProfesorIsValid = 0;
let salonIsValid = 0;

nombreMateria.addEventListener("keyup", function(event) {
    if(nombreMateria.value != "")
        materiaIsValid = 1;
    else
        materiaIsValid = 0;
});

nombreProfesor.addEventListener("keyup", function(event) {
    if(nombreProfesor.value != "")
        profesorIsValid = 1;
    else
        profesorIsValid = 0;
});

correoProfesor.addEventListener("keyup", function(event) {
    if(validar_email(correoProfesor.value))
        correoProfesorIsValid = 1;
    else
        correoProfesorIsValid = 0;
});

salon.addEventListener("keyup", function(event) {
    if(salon.value != "")
        salonIsValid = 1;
    else
        salonIsValid = 0;
});

btnNuevaMateria.addEventListener("click", function(event) {
    //Validar información
    if(materiaIsValid && profesorIsValid && correoProfesorIsValid && salonIsValid) {
        // Guardar toda la información en un objeto

        materia.idMateria = "";
        materia.titulo = nombreMateria.value;
        materia.maestro = nombreProfesor.value;
        materia.correoMaestro = correoProfesor.value;
        materia.salon = salon.value;
        materia.Horario = [];

        for(let i = 0; i < hora.length; i++) {
            if(hora[i].checked) {
                for(let j = 0; j < dias.length; j++) {
                    if(dias[j].checked) {
                        materia.Horario.push({
                                                "dia": dias[j].value,
                                                "horaInicio": hora[i].value.substring(0, 2),
                                                "horaFinal": hora[i].value.substring(5, 7)
                                             });
                    }
                }
            }
        }

        // Agregar a la lista
        nuevaClase = document.createElement("li");
        nuevaClase.innerHTML = nombreMateria.value + "<span class=\"btn btn-light remover_campo\"><i class=\"far fa-trash-alt\"></i></span>";
        nuevaClase.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        listaDeMaterias.append(nuevaClase);

        console.log(materia); // dbug
    } else {
        console.log(materiaIsValid);
        console.log(profesorIsValid);
        console.log(correoProfesorIsValid);
        console.log(salonIsValid);
        alert("Información no válida.");
    }

    // Limpiar formulario
    nombreMateria.value = "";
    nombreProfesor.value = "";
    correoProfesor.value = "";
    salon.value = "";

    materiaIsValid = 0;
    profesorIsValid = 0;
    correoProfesorIsValid = 0;
    salonIsValid = 0;
});


$('#clases').on("click",".remover_campo",function(e) {
    e.preventDefault();
    $(this).parent('li').remove();
});