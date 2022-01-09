var http= require("http");
const hostname='127.0.0.1';
const port=3000;

function myserver(req, res) {
    res.writeHead(200,{"content-Type": "text/html"});
    res.end("hello world");
}

http.createServer(myserver).listen(3000,function(){
    console.log("server running at http:// ${hostname}:${port}/")
})