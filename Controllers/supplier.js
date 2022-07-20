  
var connection = require('../database');
exports.getsuppliers= function(req, res) {
    console.log(req.body);
    let sql = "call arosupplier(?,?,?,?,?)";
    connection.query(sql,[req.body.Country_Name,req.body.State_Name,req.body.City_Name,req.body.Supplier_Key,req.body.Supplier_Name], function(err, results){
        if (err) throw err;
        res.send(results);
    });
}
exports.deletesuppliers = function(req, res) {
    console.log(req.body);
    var SK=req.body.Supplier_Key;
    var C=req.body.City_Name;
    var ST=req.body.Status;
    let sql = "Update supplier_dimension SET Status='"+ST+"' where Supplier_Key='"+SK+"' and City_Name='"+C+"'";
    connection.query(sql,[SK,C,ST],function(err, results){
        if (err) throw err;
        res.send(results);
    });
}