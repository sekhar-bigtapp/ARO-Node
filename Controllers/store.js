var connection = require('../database');
exports.getstores= function(req, res) {
    console.log(req.body);
    let sql = "call arostore(?,?,?,?,?)";
    connection.query(sql,[req.body.Store_Country,req.body.Store_State,req.body.Store_City,req.body.Store_Key,req.body.Store_Name], function(err, results){
        if (err) throw err;
        res.send(results);
    });
}
exports.deletestores = function(req, res) {
    console.log(req.body);
    var SK=req.body.Store_Key;
    var ST=req.body.Status;
    let sql = "Update store_dimension SET Status='"+ST+"' where Store_Key='"+SK+"'";
    connection.query(sql,[SK,ST],function(err, results){
        if (err) throw err;
        res.send(results);
    });
}