var connection = require('../database');
exports.getreorder= (req, res) => {
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
}