import react from "react";
import Home from "./components/home";
import Autherisation from "./components/auth";
import Login from "./components/login";
import Todos from "./components/todos";h
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";

function App(){
 
  return (
   <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth.jsx" element={<Autherisation/>}/>
        <Route path="/login" element={<Login/>}/> 
        <Route path="/todos" element={<Todos/>}/>
      </Routes>
    </Router>
  
  

  </div>
  );

}

export default App;