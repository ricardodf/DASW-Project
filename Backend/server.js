const express = require('express');
const randomize = require('randomatic');
const port = process.env.PORT || 3000;
const cors = require('cors');
const app = express();
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const User = require('./db/users');
const Token = require('./db/token');

let corsConfig = {
    origin: "https://ogonzale-project-front.herokuapp.com"
}
app.use(cors(corsConfig));
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/products', authMiddleware);
app.use('/api/products', productsRouter);

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send('Hello world!');    
});

app.post('/api/login', function (req, res) {
    // Programar aquí lógica de token
    User.find({correo: req.body.correo, password: req.body.password})
        .then(async users => {
            if(users.length > 0) {
                let user = users[0];
                let tokenString = randomize('Aa0','10')+'-'+user.id;

                await Token.findOneAndDelete({userId: user.id});
                let tokenDoc = Token({userId: user.id, token: tokenString});
                await tokenDoc.save();

                res.statusCode = 200;
                res.send({token: tokenString});
            }
            else {
                res.statusCode = 400;
                res.end();
            }
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
    
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

async function authMiddleware(req, res, next) {
    if(!req.headers['x-auth-user']) {
        res.statusCode = 401;
        res.end();
    }
    else {
        // Validar que el token sea válido
        let tokenString = req.headers['x-auth-user'];
        let token = await Token.findOne({token: tokenString});
        if(token) {
            req.userId = token.userId;
            let user = await User.findById(token.userId);
            req.esAdmin = user.esAdmin;
            next();
        }
        else {
            res.statusCode = 401;
            res.end();
        }        
    }
}