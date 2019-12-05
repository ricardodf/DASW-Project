/***********************************************************************************************
********************************** ESQUELETOS A USAR *******************************************/
let session;    // ID del usuario actual
let info = {};  // Toda la info del usuario





/***********************************************************************************************
******************************* CUANDO SE ABRE UNA PÁGINA *************************************/

// Cuando se carga la página

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
    var url = `http://localhost:3000/users/${session}`;
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
    var url = `http://localhost:3000/users/${session}`;
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(newInfo)]);
    xhr.onload = function(){
        if(xhr.status == 200)
            alert('Registro actualizado');
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
function eliminarTarea(idTarea){
    info.listaTareas.splice(idTarea-1,1);
    update(info);
    loadInfo();
}