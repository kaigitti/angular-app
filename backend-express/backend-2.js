const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
expressApp.use(expressFunction.json());

const url = 'mongodb://localhost:27017/store_db';

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

expressApp.use ((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUSH, GET, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization')
    return next()
});

mongoose.connect(url, config)
.then(() => {
    console.log('Connection Success...');
})
.catch(err => {
    res.send('Connection Failed...!!');
})

var storeSchema = new mongoose.Schema({
    p_id: String,
    p_name: String,
    p_detail: String,
    p_quantity: Number,
    p_price: Number,
    p_img: String
},{
    collection: 'products'
});

// var usersSchema = new mongoose.Schema({
//     username: String,
//     password: String
// },{
//     collection: 'users'
// })

let Product = mongoose.model('products',storeSchema);

expressApp.get('/getItems',(req,res) => {
    Product.find((err,data) => {
        if(err){
            console.log(err);
        }else{
            console.log('All Items Here!!')
            // console.log(result)
            // res.status(200).send(data);
            res.json(data);
        }
    })
})

expressApp.post('/addItems',(req,res) => {
    Product.insertMany(req.body)
    .then(result => {
        console.log('Add Items Success!!')
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log('Add Items Failed : '+err)
        // console.log(err);
    })
})

expressApp.put('/updateItems/:_id',(req,res) => {
    Product.findByIdAndUpdate(req.params._id, req.body, (err,data) => {
        if(err){
            console.log('Update Items Failed : '+err);
            // res.send(err);
        }else{
            console.log('Update Items Success!!');
            console.log(result)
            res.end();
        }
    });
});
//  
expressApp.delete('/deleteItems/:_id',(req,res) => {
    Product.findByIdAndRemove({_id: req.params._id},(err,data) => {
        if(err){
            console.log(err);
            // res.send(err);
        }else{
            res.json(data);
            // res.end();
        }
    });
});

expressApp.listen(3000, function(){
    console.log('Listening on port: 3000');
});