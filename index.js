//const { request, response } = require('express');
const express = require('express');
const mysql = require('mysql');
var connection = require('./database');
var bodyParser = require("body-parser");
var router = express.Router();
const app = express();              
const port = 5001;  
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/search-store', function(req, res) {
    console.log(req.body);
    let sql = "call arosearch(?,?,?,?,?,?,?)";
    connection.query(sql,[req.body.Date,req.body.Store_Name,req.body.Product_Categories,req.body.Sub_Categories,req.body.ABC_Class,req.body.Product_Name,req.body.SKU_CODE], function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.put('/update-quantity', (req, res, next) => {
    var  DA= req.body.Date;
    var  OQ= req.body.Override_RQ;
    let sql = "Update aro SET Override_RQ='"+OQ+"', Reorder_Qty='"+OQ+"' where Date='"+DA+"'";
    connection.query(sql,[DA,OQ],function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.get('/store-transfer', (req, res) => {
    let sql = "SELECT * FROM store_transfer";
    connection.query(sql,function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.post('/store-transfer/save', (req, res) => {
    var  ID=req.body.id;
    var  ST= req.body.Store_Store_Transferd_Config;
    let sql = "Update store_Transfer SET Store_Store_Transferd_Config='"+ST+"' where id='"+ID+"'";
    connection.query(sql,function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.get('/job-schedule', (req, res) => {
    let sql = "SELECT * FROM job_schedule";
    connection.query(sql,function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.post('/job-config', (req, res) => {

    var Pattern=req.body.Pattern;
    if(Pattern=='Monthly'){
    var  JN= req.body.Job_Name;
    var  D= req.body.Day;
    var  T= req.body.Time;
    var  TI= req.body.Time_Duration;
    let sql = "INSERT INTO Monthly(Job_Name,Day,Time,Time_Duration) VALUES (?,?,?,?)";
    connection.query(sql,[JN,D,T,TI],function(err, results){
        if (err) throw err;
        res.send(results);
    
    });
}
 if(Pattern=='Weekly'){
    var  JN= req.body.Job_Name;
    var  NW= req.body.No_Of_Weeks;
    var  T= req.body.Time;
    var  DQ= req.body.Days;
    let sql = "INSERT INTO Weekly(Job_Name,No_Of_Weeks,Time,Days) VALUES (?,?,?,?)";
    connection.query(sql,[JN,NW,T,DQ],function(err, results){
        if (err) throw err;
        res.send(results);
    
    });
}
if(Pattern=='Daily'){
    var  JN= req.body.Job_Name;
    var  ND= req.body.No_Of_Days;
    var  T= req.body.Time;
    let sql = "INSERT INTO Daily(Job_Name,No_Of_Days,Time) VALUES (?,?,?)";
    connection.query(sql,[JN,ND,T],function(err, results){
        if (err) throw err;
        res.send(results);
    
    });
    }
});
app.post('/reorder-frequency', (req, res) => {
    var Pattern1=req.body.Pattern;
    if(Pattern1=='Monthly'){
    var  D= req.body.Day;
    var  TI= req.body.Time_Duration;
    let sql = "INSERT INTO RFMonthly(Day,Time_Duration) VALUES (?,?)";
    connection.query(sql,[D,TI],function(err, results){
        if (err) throw err;
        res.send(results);
    
    });
}
if(Pattern1=='Weekly'){
  var  NW= req.body.No_Of_Weeks;
    var  DQ= req.body.Days;
    let sql = "INSERT INTO RFWeekly(No_Of_Weeks,Days) VALUES (?,?)";
    connection.query(sql,[NW,DQ],function(err, results){
        if (err) throw err;
        res.send(results);
    
    });
}
if(Pattern1=='Daily'){
    var  ND= req.body.No_Of_Days;
    let sql = "INSERT INTO RFDaily(No_Of_Days) VALUES (?)";
    connection.query(sql,[ND],function(err, results){
        if (err) throw err;
        res.send(results);
    
    });
}
});
app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database connected!');
    })
});
