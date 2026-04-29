

import http from "http";

const server=http.createServer((req,res)=>{
    res.writeHead(200,{ "Content-Type":"text/html"});
    res.end("<h1>Hello Everyone</h1>");
})

const port=5001;

server.listen(port,(err)=>{
    if(err){
        return console.log(err.message)
    }

    console.log(`server running on port ${port}`);
});