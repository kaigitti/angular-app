const expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = require("mongoose").Schema;
const userSchema = Schema({
    username: String,
    password: String,
    firstname: String,
	lastname: String,
	email: String,
	gender: String,
    dd: Number,
    mm: String,
    yy: Number,
    img: String,
    accountStatus: String,
}, {
    collection: 'users'
});

let User // model for collection
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const makeHash = async(plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

const insertUser = (dataUser) => {
    return new Promise ((resolve, reject) => {
        var new_user = new User({
            username: dataUser.username,
            password: dataUser.password,
            firstname: dataUser.firstname,
            lastname: dataUser.lastname,
            email: dataUser.email,
            gender: dataUser.gender,
            dd: dataUser.dd,
            mm: dataUser.mm,
            yy: dataUser.yy,
            img: dataUser.img,
            accountStatus: dataUser.accountStatus,
        });

        new_user.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                resolve({message: 'Sign up Successfully'});
            }
        });
    });
}

router.route('/signup')
.post((req, res) => {
    console.log('sign up');
    makeHash(req.body.password).then(hashText => {
        const dataUser = {
            username: req.body.username,
            password: hashText,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            dd: req.body.dd,
            mm: req.body.mm,
            yy: req.body.yy,
            img: req.body.img,
            accountStatus: req.body.accountStatus,
        }
        console.log(dataUser);

        insertUser(dataUser).then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            consolelog(err);
        })
    })
    .catch(err => {
    })
});
module.exports = router;