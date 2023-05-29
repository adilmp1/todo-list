import React, { useState } from 'react'
import './TodoList.css'
let completedCount=0;
const TodoList = ({id,name,todos,setTodos,setTodo,setEditId,todo,completedTodos,setCompletedTodos,setComp}) => {
  const [del,setDel] = useState(false)
  function handleCompletion(id)
  {
    setComp('Task Completed')
    handleDelete(id)
    setCompletedTodos([...completedTodos,{id:(new Date).getTime(),name:name,completed:true}])
  }
  function handleDelete(id)
  {
    // let active = document.querySelector('.todo-list')
    let notify = document.querySelector('.notify')
    notify.style.opacity='1'
    setDel(true)
    setTimeout(() => {
      const newTodos = todos.filter((todo)=>todo.id!==id)
      setTodos(newTodos)
      setDel(false)
    }, 500);
    setTimeout(() => {
      notify.style.opacity='0';
    }, 1000);
  }
  let ind;
  todos.map((todo,index) => {
    if(todo.id===id)
    {
      ind = index+1;
    }
  });
  function handleEdit()
  {
    let addEditButton = document.querySelector('#add-edit-button');

    if(addEditButton.classList.contains('ri-edit-box-line') && todo)
    {
      setTodo('');
      addEditButton.classList.toggle('ri-add-line');
      addEditButton.classList.toggle('ri-edit-box-line');
      return;
    }
    setTodo(name)
    setEditId(id)
    addEditButton.classList.toggle('ri-edit-box-line');
    addEditButton.classList.toggle('ri-add-line');
  }
  return (
    <div className='todo-list' style={del?{'opacity':'0'}:{'opacity':'1'}}>
        <div className='todo-list-part-1'>
            <div className='todo-no'> {ind} </div>
            <div className='todo-name'>{name}</div>
        </div>
        <div className='todo-list-part-2'>
            <div className='tool' onClick={()=>{
              setComp('Task Deleted')
              handleDelete(id)
            }}><i class="ri-delete-bin-line"></i></div>
            <div className='tool' onClick={()=>{
              setComp('Task Completed')
              handleCompletion(id)
              }}><i class="ri-check-double-line"></i></div>
            <div className='tool' onClick={handleEdit}><i class="ri-edit-box-line"></i></div>
        </div>
    </div>
  )
}

export default TodoList