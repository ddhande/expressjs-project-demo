var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/ind.html");
})
app.post("/ind", function(req, res){
    var x=parseInt(req.body.a1);
    var y=parseInt(req.body.a2);
    var result=x+y;
    res.send("sum of two number is:"+result);
})
app.listen(2200);
console.log("server started 2200");