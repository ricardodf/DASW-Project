let btnGuardarExamen = document.getElementById("guardarExamen");
let fecha = document.getElementById("fecha");
let salon = document.getElementById("salon");
let duracion = document.getElementById("duracion");
let nombreProfesor = document.getElementById("maestro");
let correoProfesor = document.getElementById("correo");
let materia = document.getElementById("materia");
let nuevoExamenHTML;
let infoDeXams = document.getElementById("infoExams");

let editMateriaExamen = document.getElementById("editMateriaExamen");
let editFechaExamen = document.getElementById("editFechaExamen");
let editSalonExamen = document.getElementById("editSalonExamen");
let btnEditarExamen = document.getElementById("btnEditarExamen");

let examenTemp = {
    "idExamen": -1,
    "materia": "",
    "duracion": -1,
    "salon": "",
    "maestro": "",
    "correoMaestro": "",
    "fecha": ""
};

function validar_email(email) 
{
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

window.onload = () => {
    getSession();   // Buscamos la sesión actual
    setTimeout(function(){
        loadInfo(); // Cargamos info
        setTimeout(function(){
            nombreUsuarioBarra.innerText = info.nombre;

            for(let i = 0; i < info.listaExamenes.length; i++){
                nuevoExamenHTML = document.createElement("li");
                nuevoExamenHTML2 = document.createElement("li");

                nuevoExamenHTML2.innerHTML = "<p class=\"text-left\">" +
                            "<strong>Materia:	</strong> " + info.listaExamenes[i].materia + " <br>" + 
							"<strong>Fecha:	</strong>" +  info.listaExamenes[i].fecha	+ "<br>" +
							"<strong>Salón:	</strong>"  + info.listaExamenes[i].salon	+                    " <br>" +
							
						"</p>";
                nuevoExamenHTML.innerHTML = "<a class=\"nav-link\" href=\"#\">" + info.listaExamenes[i].idExamen + ". Examen de " + info.listaExamenes[i].materia + "<span class=\"btn btn-light editar_campo\"><i class=\"far fa-edit\"></i></span><span class=\"btn btn-light remover_campo\"><i class=\"far fa-trash-alt\"></i></span>";
                
                nuevoExamenHTML.classList.add("nav-item");
                listaDeExamenes.append(nuevoExamenHTML);
                infoDeXams.append(nuevoExamenHTML2);
            }
            
        }, 500)
    }, 500);
}

function agregarEditarExamen(){

    examenTemp.idExamen = info.listaExamenes.length + 1;
    examenTemp.materia = materia.value;
    examenTemp.duracion = duracion.value;
    examenTemp.salon = salon.value;
    examenTemp.maestro = nombreProfesor;
    examenTemp.fecha = fecha.value;
    examenTemp.correoMaestro = correoProfesor; 


    info.listaExamenes.push(examenTemp);
    update(info);
    loadInfo();
}

btnEditarExamen.addEventListener("click", function (e) {
    editarExamen();
})

function editarExamen(){
    info.listaExamenes.splice(info.listaExamenes.length-1,1);

    examenTemp.idExamen = info.listaExamenes.length + 1;
    examenTemp.materia = editMateriaExamen.value;
    examenTemp.salon = editSalonExamen.value;
    examenTemp.fecha = editFechaExamen.value;

    info.listaExamenes.push(examenTemp);
    update(info);
    loadInfo();
}

function agregarEditarExamen(){

    examenTemp.idExamen = info.listaExamenes.length + 1;
    examenTemp.materia = materia.value;
    examenTemp.duracion = duracion.value;
    examenTemp.salon = salon.value;
    examenTemp.maestro = nombreProfesor.value;
    examenTemp.fecha = fecha.value;
    examenTemp.correoMaestro = correoProfesor.value; 


    info.listaExamenes.push(examenTemp);
    update(info);
    loadInfo();
}


function deleteExam(){
    info.listaExamenes.splice(info.listaExamenes.length-1,1);
    update(info);
    loadInfo();
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
        htmlText = "<a class=\"nav-link\" href=\"#\">" + (index + 1) + ". Examen de " + nombreMateria + "<span class=\"btn btn-light remover_campo\"><i class=\"far fa-trash-alt\"></i></span></a>";

        nuevoExamen.innerHTML = htmlText;
        nuevoExamen.classList.add("nav-item");
        listaDeExamenes.append(nuevoExamen);
        agregarEditarExamen();

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



$('#examenes').on("click",".remover_campo",function(e) {
    e.preventDefault();
    $(this).parent('a').remove();
    deleteExam();
});

$('#examenes').on("click",".editar_campo",function(e) {
    e.preventDefault();

    editMateriaExamen.value = info.listaExamenes[info.listaExamenes.length -1].materia;
    editFechaExamen.value = info.listaExamenes[info.listaExamenes.length -1].fecha;
    editSalonExamen.value = info.listaExamenes[info.listaExamenes.length -1].salon;

    $('#modalEditarExamen').modal('show'); // abrir
});