const express = require('express');
const router = express.Router();
const Token = require('../db/token-db');

// Create token
router.post('/', (req, res) => {
    const newToken = new Token(req.body);
    newToken.save( err => { 
        if(err)
            return res.status(500).send(err);
        return res.status(200).send(newToken);
    });
});

router.get('/', (req, res) => {
    Token.find( (err, token) => {
        if(err)
            return res.status(500).send(err);
        return res.status(200).send(token);
    });
});

// Update token
router.put('/', (req, res) => {
    Token.findOneAndUpdate(
        {unique: 1},
        req.body,
        {new: true},
        (err, token) => {
            if(err)
                return res.status(500).send(token);
            return res.send(token);
        }
    )
});

module.exports = router;