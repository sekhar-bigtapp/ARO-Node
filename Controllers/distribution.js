var connection = require('../database');
exports.getdistributions=function(req, res) {
    console.log(req.body);
    let sql = "call arodistribution(?,?,?,?,?)";
    connection.query(sql,[req.body.Country_Name,req.body.State_Name,req.body.City_Name,req.body.Distribution_Key,req.body.Distribution_Name], function(err, results){
        if (err) throw err;
        res.send(results);
    });
}
