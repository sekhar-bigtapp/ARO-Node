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

app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database connected!');
    })
});
