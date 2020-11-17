var express = require('express');
var router = express.Router();

var categoryModel = require('../model/category');
var category =categoryModel.find({});

var productModel = require('../model/product');
var product =productModel.find({}); 

var contactModel = require('../model/contactUs')
var contact = contactModel.find({})

var signupModel = require('../model/user-signup')
var signup = signupModel.find({})

router.use(express.static(__dirname+"./public/"));

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');




function checkEmail(req, res, next){
    var email= req.body.email;
    var checkExitEmail = signupModel.findOne({email:email});
    checkExitEmail.exec((err, data)=>{
      if (err) throw err;
      if (data) {
        return res.render('client/userSignup', { title: 'Scoops Ice Cream Shop', msg:"Email Already Exit" });
      }
      next()
    })
  }
  
  function checkUserName(req, res, next){
    var userName= req.body.uname;
    var checkExitUserName = signupModel.findOne({username:userName});
    checkExitUserName.exec((err, data)=>{
      if (err) throw err;
      if (data) {
        return res.render('client/userSignup', { title: 'Scoops Ice Cream Shop', msg:"UserName Already Exit" });
      }
      next()
    })
  }

   function validate(req, res, next){

          var email = req.body.email;
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(!re.test(email.toLowerCase())){
             return res.render('client/userSignup', { title: 'Scoops Ice Cream Shop', msg:"Invalid Email" });
          }

          var phone = req.body.phone;
          const rephone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      
          if(!rephone.test(phone)){
             return res.render('client/userSignup', { title: 'Scoops Ice Cream Shop', msg:"Invalid Phone Number" });
          }
          var password = req.body.password;
          // Create an array and push all possible values that you want in password
          var matchedCase = new Array();
          matchedCase.push("[$@$!%*#?&]"); // Special Charector
          matchedCase.push("[A-Z]");      // Uppercase Alpabates
          matchedCase.push("[0-9]");      // Numbers
          matchedCase.push("[a-z]");     // Lowercase Alphabates

          // Check the conditions
          var ctr = 0;
          for (var i = 0; i < matchedCase.length; i++) {
              if (new RegExp(matchedCase[i]).test(password)) {
                  ctr++;
              }
          }
          switch (ctr) {
              case 0:
              case 1:
              case 2:
                  return res.render('client/userSignup', { title: 'Scoops Ice Cream Shop', msg:"Very Weak Password" });
                  break;
          }
      next()
    }
  
  router.get('/',function(req,res, next){
        res.render('client/userSignup',{title:'Scoops Ice Cream Shop',msg:''})
  })

  
  router.post('/', validate,checkUserName,checkEmail, function(req, res, next) {
    var username = req.body.uname;
    var fName = req.body.fName;
    var email = req.body.email;
    var phone = req.body.phone;
    var city = req.body.city;
    var address = req.body.address;
    var password = req.body.password;
    var confpassword = req.body.confpassword;
    
  
    if(password != confpassword) {
      res.render('client/userSignup', { title: 'Scoops Ice Cream Shop', msg:'Password Not Matched!' });
    }
    else {
      password = bcrypt.hashSync(req.body.password, 10)
      var signupDetails = new signupModel({
        username:username,
        fName:fName,
        email:email,
        phone:phone,
        city:city,
        address:address,
        password:password,
      });
  
      signupDetails.save((err,doc)=>{
        if (err) throw err;
        res.render('client/userSignup', { title: 'Scoops Ice Cream Shop', msg:'User Register Successfully' });
      });
    }
    
  });
  

  module.exports = router;