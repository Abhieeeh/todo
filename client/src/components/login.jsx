import react ,{useState} from "react";

function login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handlesubmit=async(e)=>{
      e.preventDefault();
      const response=await fetch("/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"},
          body:JSON.stringify({email,password})
      });
      //const data=await response.json();
      //console.log(data);
    }

    return(
     <div>
    <input type="text"value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"></input>
    <input type="password"value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"></input>
    <button onClick={handlesubmit}>Submit</button>
    </div>
    );
}

export default login;