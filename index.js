const express = require ('express');
const randomize = require('randomatic');
const path = require('path');
const port = process.env.port || 5000;  // Talvez no sea en en el 5000, asi que primero checo la variable de ambiente.

const app = express();

  
// Asi podemos cargar todas las páginas del FRONT con solo una función
app.use(express.static(path.join(__dirname, 'front')));

app.use(express.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/token', require('./routes/token'));


app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});