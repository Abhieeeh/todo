import react from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate=useNavigate();
    return (
        <div className="home">
            <h1> Welcome to Todo App</h1>
            <button onClick={()=>navigate("/auth.jsx")}>Sign Up</button>
            <button onClick={()=>navigate("login")}>Login</button>
        </div>
    );
}
    
export default Home;