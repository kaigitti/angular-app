const expressFunction = require('express');
const mongoose = require('mongoose');

var expressApp = expressFunction();

const URL = 'mongodb://localhost:27017/store_db';

const CONFIG = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization')
    return next()
})

expressApp.use(expressFunction.json());

mongoose.connect(URL, CONFIG).then(() => {
    console.log('Connection Success!');
}).catch(err => {
    console.log('Connection Failed : '+err)
});

expressApp.use('/user', require('./routes/user.js'))
expressApp.use('/login', require('./routes/signin.js'))
expressApp.use('/api', require('./api/profile.js'))
expressApp.use('/products', require('./routes/products.js'));

expressApp.listen(3000, function(){
    console.log('Listening on port: 3000');
});


