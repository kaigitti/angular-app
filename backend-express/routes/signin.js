const expressFunction = require('express');
const mongoose = require( 'mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = expressFunction.Router();

const key = 'MY_KEY';

var Schema = require("mongoose").Schema;

const userSchema = Schema({
  username: String,
  password: String,
}, {
  collection: 'users'
});

let User
try {
  User = mongoose.model('users')
} catch (error) {
  User = mongoose.model('users', userSchema);
}

const compareHash = async(plaintext, hashText) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plaintext, hashText, (err, data) => {
      if(err) {
        reject(new Error('Error bcrypt compare'))
      }else{
        resolve({status: data});
      }
    })
  });
}

const findUser = (username) =>{
  return new Promise((resolve, reject) => {
    User.findOne({username: username}, (err, data) => {
      if(err){
        reject(new Error('Cannont find username!'));
      }else{
        if(data){
          resolve({accountStatus: data.accountStatus,id: data._id, username: data.username, password: data.password}) 
        }else{
          reject(new Error('Cannont find username!'));
        }
      }
    })
  })
}

router.route('/signin')
.post( async (req, res)=>{
  const playload = {
    username: req.body.username,
    password: req.body.password,
  };


  try {
    const result = await findUser(playload.username); // เอาผล มาเก็บไว้ที่ result
    const loginStatus = await compareHash(playload.password, result.password);

    const status = loginStatus.status;

    if(status) {
      const token = jwt.sign(result, key, {expiresIn: 60*5});
      res.status(200).json({result, token, status}); //ส่งกลับไป

      console.log('login!');
      console.log(result);
      
    }else{
      res.status(200).json({status});
      console.log('Cannont login!');
    }

  } catch (error) {
    res.status(404).send(error);
  }
})

module.exports = router
