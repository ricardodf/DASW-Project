let btnGuardarExamen = document.getElementById("guardarExamen");
let fecha = document.getElementById("fecha");
let salon = document.getElementById("salon");
let duracion = document.getElementById("duracion");
let nombreProfesor = document.getElementById("maestro");
let correoProfesor = document.getElementById("correo");
let materia = document.getElementById("materia");



function validar_email(email) 
{
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}



let examen = {}; // Guardará toda la información del nuevo examen

let nuevoExamen;

let listaDeExamenes = document.getElementById("examenes");

// Flags for validations
let fechaIsValid = 0;
let salonIsValid = 0;
let duracionIsValid = 0;
let profesorIsValid = 0;
let correoProfesorIsValid = 0;
let materiaIsValid = 0; // Hacer una validacion especial en la materia para ver si ya existe


fecha.addEventListener("keyup", function(event) {
    if(fechaIsValid.value != "")
        fechaIsValid = 1;
    else
        fechaIsValid = 0;
});

salon.addEventListener("keyup", function(event) {
    if(salon.value != "")
        salonIsValid = 1;
    else
        salonIsValid = 0;
});

duracion.addEventListener("keyup", function(event) {
    if(duracion.value != "")
        duracionIsValid = 1;
    else
        duracionIsValid = 0;
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

materia.addEventListener("keyup", function(event) {
    if(materia.value != "")
        materiaIsValid = 1;
    else
        materiaIsValid = 0;
});

let htmlText;
let index;
let nombreMateria;

btnGuardarExamen.addEventListener("click", function(event) {
    //Validar información
    if(materiaIsValid && profesorIsValid && correoProfesorIsValid && salonIsValid && fechaIsValid && duracionIsValid) {
        // Guardar toda la información en un objeto

        // Agregar a la lista
        nombreMateria = materia.value;
        nuevoExamen = document.createElement("li");
        index = document.querySelectorAll("#examenes > li").length;
        htmlText = "<a class=\"nav-link\" href=\"#\">" + (index + 1) + ". Examen 1 " + nombreMateria + "</a>";

        // <li class="nav-item">
		// <a class="nav-link active" href="#">1. Examen 3 Desarrollo Web</a>
		// </li>
        nuevoExamen.innerHTML = htmlText;
        nuevoExamen.classList.add("nav-item");
        listaDeExamenes.append(nuevoExamen);

        console.log(examen); // dbug
    } else {
        // console.log(materiaIsValid);
        // console.log(profesorIsValid);
        // console.log(correoProfesorIsValid);
        // console.log(salonIsValid);
        alert("Información no válida.");
    }

    // Limpiar formulario

    fecha.value = "";
    salon.value = "";
    duracion.value = "";
    nombreProfesor.value = "";
    correoProfesor.value = "";
    materia.value = "";

    fechaIsValid = 0;
    salonIsValid = 0;
    duracionIsValid = 0;
    profesorIsValid = 0;
    correoProfesorIsValid = 0;
    materiaIsValid = 0;
});