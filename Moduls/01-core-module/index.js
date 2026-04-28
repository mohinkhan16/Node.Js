//file system

const fs= require("fs")

fs.writeFileSync("new.txt","Hello World");

const name=fs.readFileSync("new.txt","utf-8")

console.log(name)