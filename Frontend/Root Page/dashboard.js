"use strict";
let tareaTemp = {
    "idTarea": -1,
    "titulo": "",
    "descripcion": "",
    "fechaEntrega": ""
};

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

let nombreUsuarioBarra = document.getElementById("nombreUsuarioNavBar");
let nuevaTareaHTML;
let nuevaMateriaHTML;

window.onload = () => {
    getSession();   // Buscamos la sesión actual
    setTimeout(function(){
        loadInfo(); // Cargamos info
        setTimeout(function(){
            nombreUsuarioBarra.innerText = info.nombre;
            console.log(info.listaTareas.length)
            for(let i = 0; i < info.listaTareas.length; i++){
                nuevaTareaHTML = document.createElement("li");
                nuevaTareaHTML.innerHTML = info.listaTareas[i].titulo + "<span class=\"btn btn-light remover_campo\"><i class=\"far fa-trash-alt\"></i></span></a>";
                nuevaTareaHTML.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                listaDeTareas.append(nuevaTareaHTML);
            }

            for(let i = 0; i < info.listaMaterias.length; i++){
                nuevaMateriaHTML = document.createElement("li");
                console.log(info.listaMaterias[i].titulo);
                nuevaMateriaHTML.innerHTML = info.listaMaterias[i].titulo ;
                nuevaMateriaHTML.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                listaDeMaterias.append(nuevaMateriaHTML);
            }
            
        }, 500)
    }, 500);
}

// funciones
function agregarEditarTarea(tarea){

    tareaTemp.idTarea = info.listaTareas.length+1;
    tareaTemp.titulo = tarea.titulo;
    tareaTemp.descripcion = tarea.descripcion;
    tareaTemp.fechaEntrega = tarea.fecha;

    console.log(info);
    console.log(info.listaTareas);

    info.listaTareas.push(tareaTemp);
    update(info);
    loadInfo();
}

function agregarEditarMateria(materia){

    materiaTemp.idMateria = info.listaMaterias.length+1;
    materiaTemp.titulo = materia.titulo;
    materiaTemp.maestro = materia.maestro;
    materiaTemp.correoMaestro = materia.correoMaestro;
    materiaTemp.salon = materia.salon;
    materiaTemp.horario = "";

    console.log(info);
    console.log(info.listaMaterias);

    info.listaMaterias.push(materiaTemp);
    update(info);
    loadInfo();
}

function validar_email(email) 
{
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

function deleteTarea(){
    info.listaTareas.splice(info.listaTareas.length -1 ,1);
    update(info);
    loadInfo();
}


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
        nuevaClase.innerHTML = nombreMateria.value ;
        nuevaClase.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        listaDeMaterias.append(nuevaClase);
        agregarEditarMateria(materia);


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


/////////// Nueva tarea //////////////////
let tarea = {}; // Guardará toda la información de la tarea nueva

let nuevaTarea;

let btnNuevaTarea = document.getElementById("btnNuevaTarea");
let nombreTarea = document.getElementById("nombreTarea");
let fechaTarea = document.getElementById("fechaTarea");
let descripcion = document.getElementById("descripcion");

let listaDeTareas = document.getElementById("tareas");

// Flags for validations
let nombretareaIsValid = 0;
let fechatareaIsValid = 0;
let descripciontareaIsValid = 0;


nombreTarea.addEventListener("keyup", function(event) {
    if(nombreTarea.value != "")
    nombretareaIsValid = 1;
    else
    nombretareaIsValid = 0;
});
fechaTarea.addEventListener("keyup", function(event) {
    if(fechaTarea.value != "")
    fechatareaIsValid = 1;
    else
    fechatareaIsValid = 0;
});
descripcion.addEventListener("keyup", function(event) {
    if(descripcion.value != "")
    descripciontareaIsValid = 1;
    else
    descripciontareaIsValid = 0;
});


btnNuevaTarea.addEventListener("click", function(event) {
    //Validar información
    if(nombretareaIsValid) {
        // Guardar toda la información en un objeto

        tarea.idMateria = "";
        tarea.titulo = nombreTarea.value;
        tarea.fecha = fechaTarea.value;
        tarea.descripcion = descripcion.value;


        // Agregar a la lista
        nuevaTarea = document.createElement("li");
        nuevaTarea.innerHTML = nombreTarea.value ;
        nuevaTarea.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        listaDeTareas.append(nuevaTarea);
        agregarEditarTarea(tarea);


        console.log(tarea); // dbug
    } else {
        console.log(nombretareaIsValid);
        console.log(fechatareaIsValid);
        console.log(descripciontareaIsValid);
        alert("Información no válida.");
    }

    // Limpiar formulario
    nombreTarea.value = "";
    fechaTarea.value = "";
    descripcion.value = "";

    nombretareaIsValid = 0;
    fechatareaIsValid = 0;
    descripciontareaIsValid = 0;

    
});

$('#tareas').on("click",".remover_campo",function(e) {
    e.preventDefault();
    $(this).parent('a').remove();
    deleteTarea();
});