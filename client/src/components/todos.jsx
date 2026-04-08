import react, { useState ,useEffect,useCallback} from 'react';
import { Plus, Trash2, CheckCircle, Clock, ClipboardList } from 'lucide-react';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [completingId, setCompletingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState('incomplete');

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
    setFilter('incomplete');
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
  setFilter('completed');
  };





const DeleteHandle=async(item)=>{
  setDeletingId(item);
  setTimeout(async () => {
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
    setDeletingId(null);
  }, 400);
}



const handleCompleted=async(item)=>{
  setCompletingId(item);
  setTimeout(async () => {
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
    setCompletingId(null);
  }, 400);
}



  const handleclick=async(e)=>{
    e.preventDefault();
    setIsAdding(true);
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
      setTimeout(() => setIsAdding(false), 300);
  }
return (
  <div className="container">
    <h1><ClipboardList size={28} /> Todo List</h1>
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input type="text" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} placeholder="Enter your todo" required/>
      <button onClick={handleclick} className={isAdding ? 'btn-adding' : ''}><Plus size={18} /> Add</button>
    </div>
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
      <button onClick={fetchTodos} className={filter === 'incomplete' ? 'active-filter' : ''}><Clock size={18} /> Incomplete Tasks</button>
      <button onClick={completedTodo} className={filter === 'completed' ? 'active-filter' : ''}><CheckCircle size={18} /> Completed Tasks</button>
    </div>
    <ul>
      {todos.map((item,i)=><li key={i} className={`${completingId === item ? 'item-completing' : ''} ${deletingId === item ? 'item-deleting' : ''}`}>
        <span style={{ fontWeight: '500' }}>{item}</span>
        <div className="todo-actions">
          {filter === 'incomplete' && (
            <button className={`icon-btn success ${completingId === item ? 'btn-completing' : ''}`} title="COMPLETED" onClick={()=>handleCompleted(item)}><CheckCircle size={18} /></button>
          )}
          <button className={`icon-btn danger ${deletingId === item ? 'btn-deleting' : ''}`} title="Delete" onClick={()=>DeleteHandle(item)}><Trash2 size={18} /></button>
        </div>
      </li>)}
    </ul>
    
  </div>
);
} 


export default Todos;