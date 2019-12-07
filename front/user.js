"use strict";

let materiaTemp = {
    "idMateria": -1,
    "titulo": "",
    "maestro": "",
    "correoMaestro": "",
    "salon": "",
    "horario": {
        "dia": {
              "dia1" : "",
              "dia2" : "",
              "dia3" : ""
            },
    },
    "horaInicio": ""
    };
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
    info.nombre = txtName.value
    update(info);
    loadInfo();

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
    info.apellido = txt.txtLastName.value;
    update(info);
    loadInfo();
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
    info.correo = txtEmail.value
    update(info);
    loadInfo();
});


/////////// Nueva materia //////////////////

let hora = document.getElementsByName("hora");
let materia = {}; // Guardará toda la información de la materia nueva

//seleccionar todos los checkbox que estan adentro de un div con id = ModalNuevaMateria
let dias = document.querySelectorAll("input[type=\"checkbox\"]");

let nuevaClase;
let nuevaClaseHTML;

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

function editarMateria(materia){
    
    info.listaMaterias.splice(info.listaMaterias.length -1 ,1);

    materiaTemp.idMateria = info.listaMaterias.length;
    materiaTemp.titulo = nombreEditarMateria.value;
    materiaTemp.maestro = nombreEditarProfesor.value;
    materiaTemp.correoMaestro = correoEditarProfesor.value;
    materiaTemp.salon = salonEditar.value;
    materiaTemp.horario = "";

    info.listaMaterias.push(materiaTemp);
    update(info);
    loadInfo();
}

function crearMateria(materia){

    materiaTemp.idMateria = info.listaMaterias.length+1;
    materiaTemp.titulo = materia.titulo;
    materiaTemp.maestro = materia.maestro;
    materiaTemp.correoMaestro = materia.correoMaestro;
    materiaTemp.salon = materia.salon;
    materiaTemp.horario = "";

    info.listaMaterias.push(materiaTemp);
    update(info);
    loadInfo();
}

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
        crearMateria(materia);

        //console.log(materia); // dbug
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
    deleteMateria();
});

window.onload = () => {
    getSession();   // Buscamos la sesión actual
    setTimeout(function(){
        loadInfo(); // Cargamos info
        setTimeout(function(){
            nombreEditarMateria.value = info.listaMaterias[info.listaMaterias.length-1].titulo;
            nombreEditarProfesor.value = info.listaMaterias[info.listaMaterias.length-1].maestro;
            correoEditarProfesor.value = info.listaMaterias[info.listaMaterias.length-1].correoMaestro;
            salonEditar.value = info.listaMaterias[info.listaMaterias.length-1].salon;



            nombreUsuarioBarra.innerText = info.nombre;
            nombre.innerText = info.nombre;
            apellido.innerText = info.apellido;
            email.innerText = info.correo;

            
           

            for(let i = 0; i < info.listaMaterias.length; i++){
                nuevaClaseHTML = document.createElement("li");
                console.log(info.listaMaterias[i].titulo);
                nuevaClaseHTML.innerHTML =info.listaMaterias[i].titulo + "<span class=\"btn btn-light editar_campo\"><i class=\"far fa-edit\"></i></span><span class=\"btn btn-light remover_campo\"><i class=\"far fa-trash-alt\"></i></span>" ;
                nuevaClaseHTML.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                listaDeMaterias.append(nuevaClaseHTML);
            }


            
        }, 500)
    }, 500);
}

function deleteMateria(){
    info.listaMaterias.splice(info.listaMaterias.length -1 ,1);
    update(info);
    loadInfo();
}






let horaEditar = document.getElementsByName("horaEditar");
//seleccionar todos los checkbox que estan adentro de un div con id = ModalNuevaMateria
let diasEditar = document.querySelectorAll("input[type=\"checkbox\"]");



let btnEditarMateria = document.getElementById("guardarEditarMateria");
let nombreEditarMateria = document.getElementById("nombreEditarMateria");
let nombreEditarProfesor = document.getElementById("nombreEditarProfesor");
let correoEditarProfesor = document.getElementById("correoEditarProfesor");
let salonEditar = document.getElementById("salonEditar");

// Flags for validations
let materiaEditarIsValid = 0;
let profesorEditarIsValid = 0;
let correoEditarProfesorIsValid = 0;
let salonEditarIsValid = 0;

nombreEditarMateria.addEventListener("keyup", function(event) {
    if(nombreEditarMateria.value != "")
        materiaEditarIsValid = 1;
    else
        materiaEditarIsValid = 0;
});

nombreEditarProfesor.addEventListener("keyup", function(event) {
    if(nombreEditarProfesor.value != "")
        profesorEditarIsValid = 1;
    else
        profesorEditarIsValid = 0;
});

correoEditarProfesor.addEventListener("keyup", function(event) {
    if(validar_email(correoEditarProfesor.value))
        correoEditarProfesorIsValid = 1;
    else
        correoEditarProfesorIsValid = 0;
});

salonEditar.addEventListener("keyup", function(event) {
    if(salonEditar.value != "")
        salonEditarIsValid = 1;
    else
        salonEditarIsValid = 0;
});


btnEditarMateria.addEventListener("click", function(event) {
    if(materiaEditarIsValid && profesorEditarIsValid && correoEditarProfesorIsValid && salonEditarIsValid) {
        editarMateria();
    }  
});

let seleccionado;

$('#clases').on("click",".editar_campo",function(e) {
    e.preventDefault();
    $('#modalEditarMateria').modal('show'); // abrir
    seleccionado = e.currentTarget.offsetParent;
});

btnEditarMateria.addEventListener("click", function(event) {
        seleccionado.innerHTML = nombreEditarMateria.value + "<span class=\"btn btn-light editar_campo\"><i class=\"far fa-edit\"></i></span><span class=\"btn btn-light remover_campo\"><i class=\"far fa-trash-alt\"></i></span>";
        editarMateria();
});