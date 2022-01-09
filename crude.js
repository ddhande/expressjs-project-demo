var express=require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var conn= mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Rita@1975",
  port:3306,
  database: "mydb"
});

app.get('/', function(req, res){
    res.sendFile(__dirname+"/crbe.html");
});

app.get('/registration', function(req, res){
    res.sendFile(__dirname+"/registration_form.html");
});
app.get('/update1', function(req, res){
    res.sendFile(__dirname+"/upd.html");
});
app.get('/delete1', function(req, res){
        res.sendFile(__dirname+"/delete.html");
});
app.get('/pass1', function(req, res){
    res.sendFile(__dirname+"/login.html");
});
app.post('/registration',function(req, res){
    var stud_id=req.body.stud_id;
    var fullname=req.body.fullname; 
    var email=req.body.email;
    var Age=req.body.Age;
    var city=req.body.city;
    var state=req.body.state;

    conn.connect(function(err){
        var sql="insert into orders (stud_id, fullname,email, city, state, Age) values('"+stud_id+"','"+fullname+"','"+email+"','"+city+"','"+state+"','"+Age+"')";
        conn.query(sql,function(err,result){
            if(err)throw err;
            console.log('record inserted');
            res.redirect('/registration')
        });
    });
});

app.post('/update',function(req, res){
    var stud_id=req.body.stud_id;
    var fullname=req.body.fullname; 
    var email=req.body.email;
    var Age=req.body.Age;
    var city=req.body.city;
    var state=req.body.state;

    conn.connect(function(err){
        var sql="update orders set fullname='"+fullname+"',email='"+email+"' , city='"+city+"', state='"+state+"',Age='"+Age+"' where stud_id='"+stud_id+"'";
        conn.query(sql,function(err,result){
            if(err)throw err;
            console.log('record updated');
            res.redirect('/update1')
        });
    });
});

app.post('/delete',function(req, res){
    var stud_id=req.body.stud_id;

    conn.connect(function(err){
        var sql="delete from orders where stud_id='"+stud_id+"'";
        conn.query(sql,function(err,result){
            if(err)throw err;
            console.log('record deleted');
            res.redirect('/delete1')
        });
    });
});
app.post('/password',function(req, res){
    var fullname=req.body.fullname;
    var pass=req.body.pass;
    if (fullname && pass){
        conn.query("select*from orders where fullname=? and password=?",[fullname,pass],function(err,result){
            if(result.length>0){
                res.redirect('/')
            }
            else{
                res.send("incorrect user name and password")
            }
        res.end();
        });
    }
    });
    
app.listen(2000);
console.log('server started with port number 2000');