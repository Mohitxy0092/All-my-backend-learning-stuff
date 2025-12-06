const http=require("http");
const hostname='127.0.0.1';
const port=3000;
const server=http.createServer((req,res)=>{
    if (req.url === "/") {
      res.statusCode = 200;
      res.setHeader("content-Type", "plain/text");
      res.end("Hello There !");
    } else if (req.url === "/register") {
      res.statusCode = 200;
      res.setHeader("content-Type", "plain/text");
      res.end("You are current in register page!");
    }else{
        res.statusCode=404;
        res.setHeader('content-Type','plain/text');
        res.end('4O4 Page Not Found.');
    }
})
server.listen(port,()=>{
    console.log(`server is running at http://${hostname}:${port}`);
})
