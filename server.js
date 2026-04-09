import express from 'express';
import bodyParser from 'body-parser';
import {Client} from "pg";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const app = express();
const port = 3000;  
app.use(express.json());



app.use(bodyParser.urlencoded({ extended: true }));
const db=new Client({
    user:process.env.user,
    host:process.env.host,
    database:process.env.database,
    password:process.env.pass,
    port:process.env.port
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
    await db.query("SELECT * FROM user_auth WHERE email=$1",[email],(err,result)=>{
        if(err){
            console.log('Error executing query',err);
        }else{
            if(result.rows.length>0){
                res.json({error:'User already exists   Try another mail Id'});
            }else{
                const hashedPassword =  bcrypt.hash(password, 10);
                db.query("INSERT INTO user_auth (email,password) VALUES ($1,$2)",[email,hashedPassword],(err,result)=>{  
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
            const hashedPass=result.rows[0].password;
            const IsMatch=bcrypt.compare(password,hashedPass)
            if(IsMatch){
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
            res.json({message:"Not Registered...Please Sign Up First"});
        }
    });
});


app.get("/todos/completed",async(req,res)=>{
    const token=req.headers.token;
    const data=jwt.verify(token,process.env.Token_Secret);  
    db.query("SELECT * FROM user_todo WHERE user_id=$1 and is_completed=$2",[data.id,true],(err,result)=>{
        if(err){
            console.log(err);   
        }else{
            var todos=result.rows.map((item)=>item.title);
            res.json({todos:todos});
        }
});});











app.get("/todos",async(req,res)=>{
    const token=req.headers.token;
    const data=jwt.verify(token,process.env.Token_Secret);
    console.log(data.id);
    db.query("SELECT * FROM user_todo WHERE user_id=$1 and is_completed=$2",[data.id,false],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            var todos=result.rows.map((item)=>item.title);
            res.json({todos:todos});
        }
});
});




app.put("/todos",async(req,res)=>{
    const item=req.headers.item;
    const token=req.headers.token;
    const data=jwt.verify(token,process.env.Token_Secret);

   db.query("UPDATE user_todo SET is_completed=true WHERE title=$1 and user_id=$2",[item,data.id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"Checkbox updated successfully"});
            console.log("working of checkbox update");
        }
    });
});






app.post("/todos",async(req,res)=>{
    console.log("working of /todos");
    const token=req.headers.token;
    const data=jwt.verify(token,process.env.Token_Secret);
    console.log(data.id);
    db.query("INSERT INTO user_todo (user_id,title,is_completed) VALUES ($1,$2,$3)",[data.id,req.body.newTodo,false],(err,result)=>{
        if(err){
            console.log(err);

        }else{
            console.log("working of insertion");
            db.query("SELECT * FROM user_todo WHERE user_id=$1 and is_completed=$2",[data.id,false],(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    var todos=result.rows.map((item)=>item.title);
                    res.json({todos:todos});
                }});
        }});
    
});


app.delete("/todos",async(req,res)=>{
   const item=req.body.item;
   const token=req.headers.token;
   const data=jwt.verify(token,process.env.Token_Secret);
  db.query("DELETE FROM user_todo WHERE title=$1 and user_id=$2",[item,data.id],(err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log("working of deletion");
        res.json({message:"Deleted Successfully"});
    }
});
});