import react from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, FileCheck } from "lucide-react";


function home(){
    const navigate=useNavigate();
    return (
        <div className="container">
            <h1><FileCheck size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} color="#0b4570" /> Welcome to Todo App</h1>
            <button onClick={()=>navigate("/auth.jsx")}><UserPlus size={18} /> Sign Up</button>
            <button onClick={()=>navigate("login")}><LogIn size={18} /> Login</button>
        </div>
    );
}
    
export default home;