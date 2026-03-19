import react ,{useState} from "react";
import {useNavigate} from "react-router-dom";


function autherisation(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    const handlesubmit=async(e)=>{
      e.preventDefault();
      const response=await fetch("/auth",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"},
          body:JSON.stringify({email,password})
      });
      const data=await response.json();
      if (data.error) {
        setMessage(data.error);  
      }
       else {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setMessage(data.message);
      }
    }
    return(
        <div>
          <h1>Sign Up Here</h1>
          {message && <p>{message}</p>}
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"></input>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"></input>
        <button onClick={handlesubmit}>Submit</button>
        
        </div>
    );
}
export default autherisation;