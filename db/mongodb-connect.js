const mongoose = require('mongoose');
const config = require('./mongodb-config.json');

mongoose.set('useFindAndModify', false);

let URI = `mongodb+srv://admin:admin@cluster0-af2v0.mongodb.net/users?retryWrites=true&w=majority`;
console.log(URI);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("Not connected to database", err);
});

module.exports = mongoose;