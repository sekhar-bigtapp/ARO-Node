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
    let sql = "call arosearch(?,?,?,?,?,?)";
    connection.query(sql,[req.body.Date,req.body.Store_Name,req.body.Category_Name,req.body.Subcategory_Name,req.body.Product_Name,req.body.SKU_ID], function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.put('/update-quantity', (req, res, next) => {
    var  DA= req.body.Time_Key;
    var  SK=req.body.Store_Key;
    var PK=req.body.Product_Key;
    var  OQ= req.body.Override_RQ;
    let sql = "Update pos_transcation SET  Re_Order_Quantity='"+OQ+"' where Time_Key='"+DA+"' AND Store_Key='"+SK+"' AND Product_Key='"+PK+"'";
    connection.query(sql,[DA,SK,PK,OQ],function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.post('/store-transfer', (req, res) => {
    let sql = "call arostoretransfer(?,?,?)";
    connection.query(sql,[req.body.Store_Name,req.body.Store_ID,req.body.Distance],function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.post('/store-transfer/save', (req, res) => {
    var  ID=req.body.id;
    var  D=req.body.Distance;
    var  ST= req.body.Store_Store_Transferd_Config;
    let sql = "Update store_Transfer SET Store_Store_Transferd_Config='"+ST+"', Distance='"+D+"' where id='"+ID+"'";
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

app.get('/store-names', (req, res) => {
    let sql = "SELECT Store_Name from store_dimension";
    connection.query(sql,function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.get('/product-names', (req, res) => {
    let sql = "SELECT Product_Name from product_dimension";
    connection.query(sql,function(err, results){
        if (err) throw err;
        res.send(results);
    });
});

var supplierRouter = require('./Routes/supplier');
app.use('/', supplierRouter);
var productRouter = require('./Routes/product');
app.use('/', productRouter);
var storeRouter = require('./Routes/store');
app.use('/', storeRouter);
var distributionRouter = require('./Routes/distribution');
app.use('/', distributionRouter);
var reorderRouter = require('./Routes/reorder');
app.use('/', reorderRouter);
var jobconfigRouter = require('./Routes/jobconfig');
app.use('/', jobconfigRouter);

app.post('/storetosupplier-master', function(req, res) {
    console.log(req.body);
    let sql = "call arostoresupplier(?,?,?,?)";
    connection.query(sql,[req.body.Supplier_Name,req.body.Supplier_Key,req.body.Product_Name,req.body.Category_Name], function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.post('/interstore-config', function(req, res) {
    console.log(req.body);
    let sql = "call arointerstore(?,?,?,?,?)";
    connection.query(sql,[req.body.Time_Key,req.body.Store_Name,req.body.Store_Key,req.body.SKU_ID,req.body.Product_Name], function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.post('/interstore-config/edit', (req, res) => {
    var  DA=req.body.Time_Key;
    var  QH=req.body.Quantity_On_Hand;
    var  TQ=req.body.Transffered_Quantity;
    var  TSN= req.body.Store_Name;
    var  SK=req.body.Store_Key;
    var  SK1=req.body.Store_Key;
    var  PK=req.body.Product_Key;
    let sql = "Update store_inventory SET Quantity_On_Hand='"+(QH-TQ)+"' where Time_Key='"+DA+"' AND Store_Key='"+SK+"' AND Product_Key='"+PK+"'";
    connection.query(sql,[DA,QH,TQ,TSN,SK,PK],function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.post('/interstore-config/save', (req, res) => {
    var  DA=req.body.Time_Key;
    var  QH=req.body.Quantity_On_Hand;
    var  TQ=req.body.Transffered_Quantity;
    var  TSN= req.body.Store_Name;
    var  SK=req.body.Store_Key;
    var  PK=req.body.Product_Key;
    var QT = parseInt(QH) + parseInt(TQ);
    let sql= "Update store_inventory SET Quantity_On_Hand='"+QT+"' where Time_Key='"+DA+"' AND Store_Key='"+SK+"' AND Product_Key='"+PK+"'";
    connection.query(sql,[DA,QH,TQ,TSN,SK,PK,QT],function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.post('/forecast', function(req, res) {
    console.log(req.body);
    let sql = "call aroforecast(?,?,?,?,?,?)";
    connection.query(sql,[req.body.Date,req.body.Store_Name,req.body.Category_Name,req.body.Subcategory_Name,req.body.Product_Name,req.body.SKU_ID], function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.post('/forecast/save', function(req, res) {
    console.log(req.body);
    var PV=req.body.PValue;
    let sql = "INSERT into pinformation Values(?)";
    connection.query(sql,[PV], function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.get('/forecast/get-pvalues', function(req, res) {
    console.log(req.body);
    var PV=req.body.PValue;
    let sql = "Select * from pinformation where PValue=(SELECT MAX(PValue) from pinformation)";
    connection.query(sql,[PV], function(err, results){
        if (err) throw err;
        res.send(results);
    });
});

app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database connected!');
    })
});
