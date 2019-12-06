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
            Horario: [
                {
                    dia: {
                        type: String,
                        required: true
                    },
                    horaInicio: {
                        type: Number,
                        required: true
                    },
                    horaFinal: {
                        type: Number,
                        required: true
                    }
                }
            ]
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
                type: Number,
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
            correoMaestro : {
                type: String,
                required: true
            },
            fecha: {
                dia: {
                    type: Number,
                    required: true
                },
                mes: {
                    type: String,
                    required: true
                },
                año: {
                    type: Number,
                    required: true
                }
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
            materia: {
                type: String,
                required: true
            },
            fecha: {
                dia: {
                    type: Number,
                    required: true
                },
                mes: {
                    type: String,
                    required: true
                },
                año: {
                    type: Number,
                    required: true
                },
                hora: {
                    type: Number,
                    required: true
                },
                minutos: {
                    type: Number,
                    required: true
                },
            }
        }
    ]
});

let User = mongoose.model('users', userSchema);
module.exports = User;