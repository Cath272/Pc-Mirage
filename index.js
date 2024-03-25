const express = require("express");
const fs= require('fs');
// const path=require('path');
// const sharp=require('sharp');
// const sass=require('sass');
// const ejs=require('ejs');


app= express();
console.log("Folder proiect", __dirname);
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());

app.set("view engine","ejs");

app.use("/resurse", express.static(__dirname+"/resurse"));



app.get(["/", "/home", "/index"], function(req, res){
    res.render("pagini/index");
})




app.get("/*", function(req, res){
    res.render("pagini/" + req.url, function(rezHtml, err){
        console.log(rezHtml);
        console.log("eroare", err);
        res.send(rezHtml);
    })
})







app.listen(8080);

console.log("a plecat serveru");