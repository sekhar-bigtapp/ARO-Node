var connection = require('../database');
exports.getjobconfig=(req, res) => {

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
}
