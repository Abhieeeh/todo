import react ,{useState} from "react";
import { useNavigate } from "react-router-dom";

function login(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setmessage]=useState("")
    const handlesubmit=async(e)=>{
      e.preventDefault();
      const response=await fetch("/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"},
          body:JSON.stringify({email,password})
      });
      const data=await response.json();
      if(data.error){
        setmessage(data.error)
      }
      if(data.message){
        if(data.token){
        localStorage.setItem("token", data.token);
         setmessage(data.message)
         navigate("/todos");
      }
       
      }
    }
      
      

    return(
     <div>
      <h1>Login Here</h1>
      {message && <p>{message}</p>}
    <input type="text"value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"></input>
    <input type="password"value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"></input>
    <button onClick={handlesubmit}>Submit</button>
    </div>
    );
}

export default login;