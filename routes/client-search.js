var express = require('express');
var router = express.Router();

var categoryModel = require('../model/category');
var category =categoryModel.find({ isDeleted : false });

var productModel = require('../model/product');
var product =productModel.find({ isDeleted : false }); 



var contactModel = require('../model/contactUs')
var contact = contactModel.find({})

router.use(express.static(__dirname+"./public/"));

  router.get('/', function(req,res, next){
    var loginUser = localStorage.getItem('loginUserInfo')

      category.exec(function(err, data){
        if (err) throw err
        res.render('client/header',{title:'Scoops Ice Cream Shop',categoryRecord:data,loginUserInfo:loginUser, success:''})
      })
  })



  router.post('/', function(req, res, next){
    var loginUser = req.session.userId

    var pages;

     var catRec;
    category.exec(function(err,catData){
        if(err) throw err
        catRec = catData
    });
    

    var fltrName = req.body.fltrName;
    var reg = ".*" + fltrName + ".*";
    if(fltrName != '') {
        var fltrParameter = { $and: [{product:{$regex : reg , $options : "i"}},
        ] } }
    else {
        var fltrParameter = {}
    }

    productModel.find(fltrParameter).exec(function(err,data){
        if(err) throw err
        res.render('client/view-product',{title:'Scoops Ice Cream Shop', prodectRecord:data,pages:pages,categoryRecord:catRec,loginUserInfo:loginUser })
    })
  })


  module.exports = router;