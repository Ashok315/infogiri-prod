const express = require('express');
const router = express.Router();
const database=require('../database');
const nodemailer=require('nodemailer');


router.get('/', function(req, res) {
  var sql="SELECT * FROM available_bank_names";
  database.query(sql,(err,results)=>{
    res.render('index', {banks:results });
    
   
  })
 
});

router.post('/get_state', function(req, res) {
    var bank_name=req.body.bank_name;
    var sql="SELECT DISTINCT adr4 FROM bank_records WHERE name=?";

    database.query(sql, [bank_name], (err,results)=>{
   
    if(err) throw err
 
   res.json(results);

 })
  
});

router.post('/get_city', function(req, res) {
  var bank_name=req.body.bank_name;
  var bank_state=req.body.bank_state;
  var sql="SELECT DISTINCT adr3 FROM bank_records WHERE name=? AND adr4=?";

  database.query(sql, [bank_name,bank_state], (err,results)=>{
 
  if(err) throw err

 res.json(results);

})

});

router.post('/get_branch', function(req, res) {
  var bank_name=req.body.bank_name;
  var bank_state=req.body.bank_state;
  var bank_city=req.body.bank_city;
  var sql="SELECT DISTINCT adr1 FROM bank_records WHERE name=? AND adr4=? AND adr3=?";

  database.query(sql, [bank_name,bank_state,bank_city], (err,results)=>{
 
  if(err) throw err

 res.json(results);

})

});

router.post('/get_ifsc', function(req, res) {
  var bank_name=req.body.bank_name;
  var bank_state=req.body.bank_state;
  var bank_city=req.body.bank_city;
  var bank_branch=req.body.bank_branch;
  var sql="SELECT ifsc,name,adr5,micr,contact FROM bank_records WHERE name=? AND adr4=? AND adr3=? AND adr1=?";

  database.query(sql, [bank_name,bank_state,bank_city,bank_branch], (err,results)=>{
 
  if(err) throw err

 res.json(results);

})

});

router.get('/find_city',function(req,res){
  res.render('pincode_city',{title:'Infogiri'})
});
router.get('/about_us',function(req,res){
  res.render('about',{title:'Infogiri'})
});
router.get('/privacy_policy',function(req,res){
  res.render('privacy_policy' ,{title:'Infogiri'})
});
router.get('/terms_conditions',function(req,res){
  res.render('terms_conditions' ,{title:'Infogiri'})
});

router.get('/contact_us',function(req,res){
  res.render('contact_us',{title:'Infogiri'})
});

router.post('/contact_us', function(req,res){
  var fullname=req.body.fullname;
  var email=req.body.email;
  var message=req.body.message;
  var transporter=nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
     auth:{
      user:"ashokpateliya315@gmail.com",
      pass:"irpvrxpxucefqojl"
    }
  });
  var mailOptions={
    from:'ashokpateliya315@gmail.com',
    to:email,
    cc:'ashokpateliya315@gmail.com',
    subject:'Thanks for giving us your feedback ' + fullname,
    text:'Thanks for your message You have sent us: ' + message
     
  }
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(mailOptions,function(err,info){
    if (err) {
      res.json({ status: -1, message: 'Error Occured', err: err });
  }
  else {
      console.log('Email sent: ' + info.response);
      res.redirect('/');
     
  }
   
  });

  

});



module.exports = router;
