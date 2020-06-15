const expressFunction = require('express');
const router = expressFunction.Router();
// const authorization = require('../config/authorize');
const mongoose = require( 'mongoose');
const { decode } = require('jsonwebtoken');
const jwt = require('jsonwebtoken')

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
}, {
    collection: 'users'
});

let User
try {
  User = mongoose.model('users')
} catch (error) {
  User = mongoose.model('users', userSchema);
}

const getProfile = (id) => {
  return new Promise ((resolve, reject) => {
    User.find({_id: id}, (err, data) => {
      if(err){
        reject(new Error('Cannot get Profile!'));
      }else{
        if(data){
          resolve(data);
        }else{
          reject(new Error('Cannot get Profile!'));
        }
      }
    })
  });
}


const key = 'MY_KEY';


router.route('/profile').get((req, res) => {

  const token = req.headers['authorization'];

  if(token === undefined) {
    return res.status(401).json({
      "status": 401,
      "message": 'Unauthorized'
    })
  }else{
    jwt.verify(token, key, (err, decode) => {
      if(err) {
        return res.status (401).json({
          "status": 401,
          "message": 'Unauthorized'
        })
      }else{
        console.log('decode')
        console.log(decode.id)

        console.log('Get Profile');
        getProfile(decode.id)
        .then( result => {
          console.log(result);
          res.status(200).json(result);
        })
        .catch( err => {
          console.log(err);
        });


      }
    })
  }


});

module.exports = router






// -44.00