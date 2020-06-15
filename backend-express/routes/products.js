const expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const { decode } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const key = 'MY_KEY';

var Schema = require('mongoose').Schema;

var storeSchema = new mongoose.Schema({
    p_id: String,
    p_name: String,
    p_detail: String,
    p_quantity: Number,
    p_price: Number,
    p_img: String
}, {
    collection: 'products'
});

let Product = mongoose.model('products', storeSchema);

router.route('/manager').get((req, res) => {
    const token = req.headers['authorization'];

    if (token === undefined) {
        return res.status(401).json({
            "status": 401,
            "message": 'Unauthorized'
        })
    } else {
        jwt.verify(token, key, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    "status": 401,
                    "message": 'Unauthorized'
                })
            } else {
                Product.find((err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).json(data);
                    }
                })


            }
        })
    }


})




router.route('/addItems').post((req, res) => {
    Product.insertMany(req.body)
        .then(result => {
            console.log('Add Items Success!!')
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
})

// router.route('/updateItems/:_id').put((req,res) => {
//     Product.findByIdAndUpdate(req.params._id, req.body, (err,data) => {
//         if(err){
//             console.log('Update Items Failed : '+err);
//         }else{
//             console.log('Update Items Success!!');
//             console.log(result)
//             res.end();
//         }
//     });
// });

// router.route('/updateItems/:_id').put(async (req,res) => {
//     const payload = req.body;
//     const { p_id } = req.params

//     const product = await Product.findByIdAndUpdate(p_id, { $set: payload})
//     res.json(product);
// })


// router.route('/deleteItems/:p_id').delete((req,res) => {
//     Product.findByIdAndRemove({p_id: req.params.id},(err,data) => {
//         if(err){
//             console.log(err);
//         }else{
//             res.json(data);
//         }
//     });
// });

router.route('/deleteItems/:p_id').delete(async (req, res) => {
    const { p_id } = req.params

    await Product.findByIdAndDelete(p_id)
    res.status(204).end()
})

module.exports = router;