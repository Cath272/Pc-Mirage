const express=require("express"),fs=require("fs");app=express(),console.log("Folder proiect",__dirname),console.log("Cale fisier",__filename),console.log("Director de lucru",process.cwd()),app.set("view engine","ejs"),app.use("/resurse",express.static(__dirname+"/resurse"));