import express from 'express';
//import axios from 'axios';
import bodyParser from 'body-parser';
import {Client} from "pg";
//import bycrypt from 'bcrypt';

const app = express();
const port = 3000;  
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));
 const db=new Client({
    user:'postgres',
    host:'localhost',
    database:'Todo',
    password:'Abhishekk@112006',
    port:5432
 });

 


db.connect((err)=>{
    if(err){
        console.log('Error connecting to the database',err);
    }else{
        console.log('Connected to the database');
    }})


app.post('/auth',async(req,res)=>{
    console.log('req.body:',req.body);
    const {email,password}=req.body;
    
    const emailCheck=db.query("SELECT * FROM USER_AUTH WHERE email=$1",[req.body.email], (err,result)=>{
        if(err){
            console.log('Error executing query',err);
            }});
    
    if(result.row.length>0){
        console.log("User already exists");
    }
    else{

        db.query("INSERT INTO user_auth (email,password) VALUES ($1,$2)",[email,password],(err,result)=>{
     
       if(err){
            console.log('Error executing query',err);
            
        }else{
           console.log('Database query executed');
        }
     });
    }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post("/login",async(req,res)=>{
    console.log("working");
});