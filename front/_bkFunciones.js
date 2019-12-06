/***********************************************************************************************
********************************** ESQUELETOS A USAR *******************************************/
let session;    // ID del usuario actual
let info = {};  // Toda la info del usuario

let materiaTemp = {
    "idMateria": -1,
    "titulo": "",
    "maestro": "",
    "correoMaestro": "",
    "salon": "",
    "horario": {
        "dia": "",
        "horaInicio": -1,
        "horaFinal": -1,
    }
};
let examenTemp = {
    "idExamen": -1,
    "materia": "",
    "duracion": -1,
    "salon": "",
    "maestro": "",
    "correoMaestro": "",
    "fecha": ""
};
let tareaTemp = {
    "idTarea": -1,
    "titulo": "",
    "descripción": "",
    "materia": "",
    "fechaEntrega": ""
};

/***********************************************************************************************
******************************* CUANDO SE ABRE UNA PÁGINA *************************************/

// Cuando se carga la página
window.onload = () => {
    getSession();   // Buscamos la sesión actual
    setTimeout(function(){
        loadInfo(); // Cargamos info
    }, 300);
}

// Buscar ID de sesión del usuario
function getSession(){
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/currentSession";
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = function(){ 
        if(xhr.status == 200){
            session = (JSON.parse(xhr.responseText)).sessionID;
        }
    }
}

// Pedir al SERVER, la info del usuario actual
function loadInfo(){
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:5000/api/users/${session}`;
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = function(){ 
        if(xhr.status == 200){
            info = JSON.parse(xhr.responseText);
        }
        else{
            console.log('Loading failure');
        }
    }
}

/***********************************************************************************************
******************************* MANDAR NUEVA INFO A SERVER *************************************/
function update(newInfo){
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:5000/api/users/${session}`;
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(newInfo)]);
    xhr.onload = function(){
        if(xhr.status == 200)
            alert('Usuario Actualizado');
        else
            alert(xhr.status+': '+xhr.statusText);
    }
}

/***********************************************************************************************
************************************ EJEMPLO DE USO *******************************************/

// Tienes tu función de agregar/editar, le pasas como parametros un array/json o lo que quieras como parámetro
function agregarEditarTarea(/*nuevosValores*/){
    // Se va a ir actualizando el esqueleto tareaTemp
    tareaTemp.idTarea = info.listaTareas.length+1;
    tareaTemp.titulo = "Un Ejemplo";
    tareaTemp.descripción = "Ejemplo";
    tareaTemp.materia = "EA";
    //... y asi

    // Lo agregas a la lista de tareas
    info.listaTareas.push(tareaTemp);
    // Después, solo se manda a actualizar al SERVER y listo
    update(info);
    // Volvemos a cargar nuestros datos
    loadInfo();
}

// Si quieres eliminar, pasar solo el ID del objeto y listo
// OJO: el idTarea no es la posición real en la lista, necesita mejorar esto...
function eliminarTarea(idTarea){
    info.listaTareas.splice(idTarea-1,1);
    update(info);
    loadInfo();
}