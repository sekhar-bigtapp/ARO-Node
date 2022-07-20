var connection = require('../database');
exports.getproducts = function(req, res) {
    console.log(req.body);
    let sql = "call aroproduct(?,?,?,?,?)";
    connection.query(sql,[req.body.Supplier_Name,req.body.Product_Name,req.body.Category_Name,req.body.Status,req.body.SKU_ID], function(err, results){
        if (err) throw err;
        res.send(results);
    });
}
exports.deleteproducts = function(req, res) {
    console.log(req.body);
    var SN=req.body.Store_Name;
    var PK=req.body.Product_Key;
    var ST=req.body.Status;
    let sql = "Update product_dimension SET Status='"+ST+"' where Store_Name='"+SN+"' and Product_Key='"+PK+"'";
    connection.query(sql,[SN,PK,ST],function(err, results){
        if (err) throw err;
        res.send(results);
    });
}