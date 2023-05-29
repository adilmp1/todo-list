import { useState, useEffect } from "react";
import "./App.css";
import CompletedTodoList from "./CompletedTodoList";
import logo from "./images/logo.png";
import TodoList from "./TodoList";
let count = 0;
const getLocalItems =   () => {
  let list = localStorage.getItem('lists');
  console.log(list);
  if(list)
  {
      return JSON.parse(localStorage.getItem('lists'));
  }
  else
  {
      return [];
  }
}
const getLocalCompletedItems =   () => {
  let list = localStorage.getItem('completedLists');
  console.log(list);
  if(list)  
  {
      return JSON.parse(localStorage.getItem('completedLists'));
  }
  else
  {
      return [];
  }
}
function App() {
  const [comp,setComp] = useState('Task Deleted')
  const [option,setOption]= useState('Active')
  const [todos, setTodos] = useState(getLocalItems);
  const [todo, setTodo] = useState();
  const [editId, setEditId] = useState()
  const [completedTodos, setCompletedTodos] = useState(getLocalCompletedItems)
  useEffect (()=>{
    localStorage.setItem('lists',JSON.stringify(todos))
  },[todos]);

  useEffect (()=>{
    localStorage.setItem('completedLists',JSON.stringify(completedTodos))
  },[completedTodos]);
  function handleSelection(optionValue)
  {
    let options = document.querySelector('.option');
    let option2 = document.querySelector('.option2');
    if(optionValue==='active')
    {
      setOption('Active')
      if(options.classList.contains('current'))
      {
        return;
      }
      else
      {
        option2.classList.toggle('current')
        options.classList.toggle('current')
      }

    }
    else
    {
      setOption('Completed')
      if(option2.classList.contains('current'))
      {
        return;
      }
      else
      {
        option2.classList.toggle('current')
        options.classList.toggle('current')
      }

    }
  }
  function todoActive()
  {
    return(
      todos.filter((todoItem)=>todoItem.completed===false).map((todoItem)=>{
        return(
        <TodoList 
          id={todoItem.id} 
          name={todoItem.name}
          todos = {todos}
          setTodos = {setTodos}
          setTodo = {setTodo}
          setEditId = {setEditId}
          todo = {todo}
          setCompletedTodos = {setCompletedTodos}
          completedTodos = {completedTodos}
          setComp = {setComp}
        />
        )
      })
    )
  }
  function todoCompleted()
  {
    return(
      completedTodos.map((todoItem)=>{
        return(
        <CompletedTodoList 
          id={todoItem.id} 
          name={todoItem.name}
          setCompletedTodos = {setCompletedTodos}
          completedTodos = {completedTodos}
          setComp = {setComp}
        /> 
        )
      })
    )
  }
  function todoMap()
  {
    if(option==='Active')
      {
        return todoActive()
      }
      else if(option==='Completed')
      {
        return todoCompleted()
      }
  }


  function updateTodos() {
    let flag=1;
    let addEditButton = document.querySelector('#add-edit-button');
    if(editId && addEditButton.classList.contains('ri-edit-box-line'))
    {
      todos.filter((todoItem)=>{
        if(todoItem.id===editId)
        {
          todoItem.name=todo;
          setTodos([...todos])
          setTodo('')
          addEditButton.classList.toggle('ri-edit-box-line');
          addEditButton.classList.toggle('ri-add-line');
        }
      })
    }
    todos.filter((todoItem)=>{
      if(todoItem.name===todo)
      {
        flag=0;
      }
    })
    if(flag)
    {
      setTodos([...todos, { id:(new Date).getTime(), name: todo, completed:false }]);
      setTodo('');
    }
  }
  return (
    <div className="app">
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css"
        rel="stylesheet"
      />
      <div className="container">
        <div>
          <img src={logo} />
        </div>
        <h4>Add Your Todo List Here</h4>
        <div className="add-item">
          <input
            onChange={(event) => setTodo(event.target.value)}
            value={todo}
            type="text"
            placeholder="Add Item ..."
          />
          <button
            onClick={() => {
              if (todo) {
                updateTodos();
              }
            }}
          ><i id="add-edit-button" class="ri-add-line"></i>
          </button>
        </div>
        <div className="todos-container">
          <div className="filter-sort">
            <div onClick={()=>handleSelection('active')} className="option current">Active</div>
            <div onClick={()=>handleSelection('completed')} className="option option2 ">Completed</div>
          </div>
          <div>
            {todoMap()}
          </div>
          <div className='notify'>
            <div><i class="ri-error-warning-fill"></i></div>
            <div>{comp}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


