const mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'ashok',
    password:'Ashok@0315',
    database:'infogiri_control'

});

connection.connect((err)=>{
if(err) throw err;
console.log('Successfully connected to the mysql database');

});

module.exports=connection;