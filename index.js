const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');

const app=express();

// Set up body-parser middleware;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Configure MySql connection
const con=   mysql.createConnection({
    host:'localhost',
    user:'ashok',
    password:'Ashok@0315',
    database:'infogiri_db'
});

// Connect to mysql
con.connect((err)=>{
    if(err) throw err;
    console.log('Successfully connected to the mysql database');
});



app.get('/',(req,res)=>{
    const sql="SELECT name, adr4 from bank_records";
    con.query(sql,(err,results)=>{
        if(err) throw err;

       res.send(results);
    })
})

// Start the server
const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
