const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'someothersecretasdefault';
const middleware = require('./middleware');

const Company = require('../models/Company');


router.post('/signup', (req, res) => {
  console.log("REQQQQQQQQ", req.body)
  const { name, email, password, cpassword } = req.body;
   const errors = {};
   if (!name || !email || !password || !cpassword) {
       errors.message = "Please enter all fields";
      return res.status(400).json(errors);
  }
  if (password != cpassword) {
    errors.message = "Passwords do not match";
    return res.status(400).json(errors);
  }
   Company.findOne({ email: email }).then(company => {
      if (company) {
        errors.message = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const newCompany = new Company({ ...req.body });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newCompany.password, salt, (err, hash) => {
            if (err) throw err;
            newCompany.password = hash;
            console.log("register" , newCompany)
            newCompany.save().then(company => {
              console.log( 'You are now registered and can log in');
               res.status(200).send({data:company});
            }).catch(err =>{
              console.log(err)
            });
          });
        });
      }
    });
});

router.post('/login', async (req, res) => {
    console.log("logib calle", req.body)
    const errors = {};
    const email = req.body.email
    const password = req.body.password;
    const company = await Company.findOne({ email }).select("+password");
    console.log("useruseruser" , company)
    if (!company) {
        errors.message = "No Account Found";
        return res.status(400).json(errors);
    }
    isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
        errors.message = "Password is incorrect";
        return res.status(400).json(errors);
    }
    const payload = {
        id: company._id,
        username: company.username
    };
    token = await jwt.sign(payload, secret, { expiresIn: 36000 });
    if (!token) {
        return res.status(500).json({ error: "Error signing token", raw: err });
    }
    console.log("Success login")
    return res.json({
        success: true,
        token: `${token}`,
        user:{
            username:company.username,
            email:company.email,
        } 
    });
});


router.get('/me/:user', middleware.checkToken,  async function(req, res, next) {
    console.log("Profile calling...",req.params.user)
    const email = req.params.user
    const dbUser = await Company.findOne({ email });
    res.status(200).json(dbUser);
});


router.get('/logout', (req, res) => {
  localStorage.removeItem('id_token');
  localStorage.removeItem('loggedIn_email');
  res.redirect('/login');
});



module.exports = router;
