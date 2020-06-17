const expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var expressApp = expressFunction();

var Schema = require("mongoose").Schema;
const addressSchema = Schema({
    id: String,
    name_surname: String,
    tel: Number,
    province: String,
    district: String,
    sub_district: String,
    postcode: Number,
    other: String
}, {
    collection: 'address'
});

let Address
try {
    Address = mongoose.model('address')
} catch (error) {
    Address = mongoose.model('address', addressSchema);
}

router.route('/showAddress').get((req, res) => {
    Address.find({}, (err, data) => {
        if (err) {
            console.log('No Address Available Or Error : ' + err);
        } else {
            console.log('All Address Here!!')
            res.status(200).send(data);
            console.log(data);
        }
    })
})

router.route('/addAddress').post((req, res) => {
    Address.insertMany(req.body)
    .then(result => {
        console.log('Add address Success!!')
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log('Add address Failed : ' + err)
        console.log(err);
    })

})

// router.route('/deleteAddress').delete((req, res) => {
//     const { id } = req.params

//     await Address.findByIdAndDelete(id)
//     res.status(204).end()

// })

module.exports = router;