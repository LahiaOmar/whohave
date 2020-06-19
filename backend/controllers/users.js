const bcrypt = require('bcrypt')

exports.storeSignUp = (req, res, next)=>{
  bcrypt.hash(req.body.password, 10)
    .then(hash=>{
      console.log("password hash", hash)
    })
    .catch(error => res.status(500).json({error}))
}

exports.userSignUp = (req, res, next) =>{
  
}