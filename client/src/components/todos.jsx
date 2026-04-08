import react, { useState ,useEffect,useCallback} from 'react';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  

  const fetchTodos=async()=>{
    const token = localStorage.getItem('token');
    const response = await fetch ("/todos",{
      method: 'GET',
      headers:{
        "Token":token
      },   
      
    });
    const data = await response.json();
    console.log(data.message);
    setTodos(data.todos);
  } 


  useEffect(() => { 
  fetchTodos();
  }, []);

 
 

const completedTodo=async()=>{
  const token = localStorage.getItem('token');
  const response = await fetch ("/todos/completed",{
    method: 'GET',
    headers:{
      "content-Type":"application/json",
      "Token":token
    },  
    //body:JSON.stringify({is_completed:true})
  });
  const data = await response.json();
  console.log(data.message);
  setTodos(data.todos); 
  };




const DeleteHandle=async(item)=>{
  const token = localStorage.getItem('token');
  const response=await fetch("/todos",{
    method:"DELETE",
    headers:{
      "content-Type":"application/json",
      "token":token,
      
    },
    body:JSON.stringify({item:item})
  });
  console.log(response);
  fetchTodos();


}



const handleCompleted=async(item)=>{
  const token = localStorage.getItem('token');
  const response=await fetch("/todos",{
    method:"PUT",
    headers:{
      "content-Type":"application/json",
      "token":token,
      "item":item
    }
  });
  console.log(response);
  fetchTodos();
}



  const handleclick=async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response= await fetch("/todos",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Token":token      
      },
        body:JSON.stringify({newTodo})
      });
      setNewTodo("");
      const data=await response.json();
      console.log(data.todos);
      setTodos(data.todos);
      

  }
return (
  <div>
    <h1>Todo List</h1>
    <input type="text" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} placeholder="Enter your todo" required/>
    <button onClick={handleclick}>Add</button>
    <button onClick={completedTodo}>Completed Tasks</button>
    <ul>
      {todos.map((item,i)=><li key={item}>{item} <button onClick={()=>DeleteHandle(item)}>Delete</button> <button onClick={()=>handleCompleted(item)}>COMPLETED</button></li>)}
    </ul>
    
  </div>
);
} 


export default Todos;