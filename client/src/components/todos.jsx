import react, { useState ,useEffect} from 'react';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  








  
  useEffect(() => {
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
  fetchTodos();
  }, []);












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
    <input type="text" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} placeholder="Enter your todo"></input>
    <button onClick={handleclick}>Add</button>
    <ul>
      {todos.map((item,i)=><li key={item}>{item} <button>Delete</button></li>)}
    </ul>
    
  </div>
);
}
export default Todos;