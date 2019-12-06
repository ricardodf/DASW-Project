const express = require('express');
const router = express.Router();
const Users = require('../db/user-db');     // Datos de la "base de datos"// Gets USERS in db

// Todos los usuarios
router.get('/', (req, res) => {
    Users.find()
        .then(Users => {
            res.statusCode = 200;
            res.json({ Users});
            res.send();
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

// Tomar un solo usuario
router.get('/:id', (req, res) => {
    Users.find({id: req.params.id }, (err, user) => {
        if(err) 
            return res.status(500).send(err);
        return res.status(200).send(user);
    })
});

// Crear un usuario
router.post('/', async function(req, res) {
    let newUser = req.body;
    // Validar si vienen las propiedades
    if(!newUser.id || !newUser.nombre || !newUser.apellido || !newUser.correo || !newUser.password) {
        res.statusCode = 400;
        res.send('Las propiedades requeridas son: nombre, apellido, correo, sexo, fecha y password');
    }
    else {
        // Validar si existe un usuario con el mismo correo o nombres y apellidos
        let sameIdUser = await Users.find({id: newUser.id});
        let sameEmailUser = await Users.find({correo: newUser.correo});
        let sameNameUser = await Users.find({nombre: newUser.nombre, apellido: newUser.apellido});

        if(sameEmailUser.length > 0) {
            res.statusCode = 400;
            res.send('Ya existe un usuario con el mismo correo');
        }
        else if(sameNameUser.length > 0) {
            res.statusCode = 400;
            res.send('Ya existe un usuario con el mismo nombre');
        }
        else if(sameIdUser.length > 0){
            res.statusCode = 400;
            res.send('ID Repetido')
        }
        else {
            let userDocument = Users(newUser);
            userDocument.save()
                .then(user => {
                    res.statusCode = 201;
                    res.send(user);
                })
                .catch(reason => {
                    res.statusCode = 500;
                    res.end();
                });
        }
    }
});

// Update usuario
router.put('/:id', (req, res) => {
    Users.findOneAndUpdate(
        {id: req.params.id},
        req.body,
        {new: true},
        (err, user) => {
            if(err)
                return res.status(500).send(err);
            return res.send(user);
        }
    )

});

// DELETE un usuario con id
router.delete('/:id', (req, res) => {
    Users.findOneAndDelete(
        {id: req.params.id}, 
        (err, user) => {
            if (err) 
                return res.status(500).send(err);
            const response = {
                alert: "Usuario eliminado",
                info: user
            }
            return res.status(200).send(response);
        }
    )
 });
 
module.exports = router;
