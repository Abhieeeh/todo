import express from 'express';
import bodyParser from 'body-parser';
import {Client} from "pg";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;  
app.use(express.json());

var todolist = [];



app.use(bodyParser.urlencoded({ extended: true }));
const db=new Client({
    user:'postgres',
    host:'localhost',
    database:'Todo',
    password:process.env.pass,
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
    db.query("SELECT * FROM user_auth WHERE email=$1",[email],(err,result)=>{
        if(err){
            console.log('Error executing query',err);
        }else{
            if(result.rows.length>0){
                res.json({error:'User already exists   Try another mail Id'});
            }else{
                db.query("INSERT INTO user_auth (email,password) VALUES ($1,$2)",[email,password],(err,result)=>{  
                if(err){
                  console.log('Error executing query',err);           
                }else{
                  res.json({message:'Registered sucessfully \n Please Login, you will be redirected to login page in 3 seconds'});
                  
            }
     });
            }

        
    
}})});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post("/login",async(req,res)=>{
    console.log("working of /login");
    const {email,password}=req.body;
    db.query("SELECT * FROM user_auth WHERE email=$1",[email],(err,result)=>{
        if(err){
            return res.json({error:'Error executing query'});
        }
        if(result.rows.length>0){
            if(result.rows[0].password==password){
                try{
                const user=result.rows[0];
                const userId =result.rows[0].id;
                const token=jwt.sign(user,process.env.Token_Secret);
                res.json({message:'Login successful',token:token});               
                }catch(error){
                    console.error('Error generating token:',error);
                    res.json({error:'Error generating token'});
                }
            }else{
                res.json({error:'Invalid password'});
            }
        }else{
            res.json({message:"Not Registered \n Please Sign Up First"});
        }
    });
});














app.get("/todos",async(req,res)=>{
    const token=req.headers.token;
    const data=jwt.verify(token,process.env.Token_Secret);
    console.log(data.id);
    db.query("SELECT * FROM user_todo WHERE user_id=$1",[data.id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            var todos=result.rows.map((item)=>item.title);
            res.json({todos:todos});
        }
});
});














app.post("/todos",async(req,res)=>{
    console.log("working of /todos");
    const token=req.headers.token;
    const data=jwt.verify(token,process.env.Token_Secret);
    console.log(data.id);
    db.query("INSERT INTO user_todo (user_id,title) VALUES ($1,$2)",[data.id,req.body.newTodo],(err,result)=>{
        if(err){
            console.log(err);

        }else{
            console.log("working of insertion");
            db.query("SELECT * FROM user_todo WHERE user_id=$1",[data.id],(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    var todos=result.rows.map((item)=>item.title);
                    res.json({todos:todos});
                }});
        }});
    
});