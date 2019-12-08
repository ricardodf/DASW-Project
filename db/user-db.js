const mongoose = require('./mongodb-connect')

let userSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    listaMaterias: [
        {
            idMateria: {
                type: Number,
                required: true
            },
            titulo: {
                type: String,
                required: true
            },
            maestro: {
                type: String,
                required: true
            },
            correoMaestro:{
                type: String,
                required: true
            },
            salon: {
                type: String,
                required: true
            },
            Horario: {
                type: String,
                required: true
            }
        }
    ],
    listaExamenes: [
        {
            idExamen: {
                type: Number,
                required: true
            },
            materia: {
                type: String,
                required: true
            },
            duracion: {
                type: String,
                required: true
            },
            salon: {
                type: String,
                required: true
            },
            maestro: {
                type: String,
                required: true
            },
            fecha: {
                type: String,
                required: true
            },
            correoMaestro : {
                type: String,
                required: true
            }
        }
    ],
    listaTareas: [
        {
            idTarea: {
                type: Number,
                required: true
            },
            titulo: {
                type: String,
                required: true
            },
            descripcion: {
                type: String,
                required: true
            },
            fecha: {
                type: String,
                required: true
            }
        }
    ]
});

let User = mongoose.model('users', userSchema);
module.exports = User;