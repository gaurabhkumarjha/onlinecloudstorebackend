require("dotenv").config();
const express= require ("express");
const app=  express();
require('./db/conn');
const cors= require("cors");
const router= require('./routes/router');
const port= 8000;
const path= require("path");



app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.join (__dirname, "./public/files")));


app.use(router);

app.get('/', (req,res)=>{
   
      res.status(201).json("express running...");
});


app.listen(port, ()=>{
 
       console.log("server is running...");
});