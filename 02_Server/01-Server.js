
import http from "http";

const server =http.createServer((req,res)=>{
    res.write("Hello from server");
    res.end();
});

const port= 5001;

server.listen(port,(err)=>{
    if(err){
        return console.log(err.message);
    }
    console.log(`server runing on port ${port}`);
});