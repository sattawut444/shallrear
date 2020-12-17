var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  database: "accouts"
});


router.get('/login', function(req, res, next) {
  res.render('/login', { title: 'Express' });
});
router.get('/auth/:user/:pwd', function(req, res) {
  var user = req.params.user;
  var pwd = req.params.pwd;
  sql = "select * from accouts where user='"+user+"'",sql += " and password = '"+pwd+"'",con.query(sql,function(err,result){
    if (err) throw err;
    //res.send("result ="+JSON.stringify(result)); 
    var resJson;
    if(result.length > 0){
      resJson = {"result":1};
    }else{
      resJson = {"result":0};
    }
    res.send(resJson);
  });
});
module.exports = router;