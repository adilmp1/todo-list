import React, { useState } from 'react'
let completedCount=0;
const CompletedTodoList = ({id,name,completedTodos,setCompletedTodos,setComp}) => {
  const [del,setDel] = useState(false)
  const [color, setColor] = useState('rgb(90, 178, 255)')
  function handleDeleteComp(id)
  {
    setComp('Task Deleted')
    let notify = document.querySelector('.notify')
    notify.style.opacity='1'
    setDel(true)
    setTimeout(() => {
      const newTodos = completedTodos.filter((todo)=>todo.id!==id)
      setCompletedTodos(newTodos)
      setDel(false)
    }, 500);
    setTimeout(() => {
      notify.style.opacity='0';
    }, 1000);
  }
  let inde;
  completedTodos.map((todo,index) => {  
    if(todo.id===id)
    {
      inde = index+1;
    }
  });
  return (
    <div className='todo-list' style={del?{'opacity':'0'}:{'opacity':'1'}}>
        <div className='todo-list-part-1'>
            <div className='todo-no'> {inde} </div>
            <div className='todo-name'>{name}</div>
        </div>
        <div className='todo-list-part-2'>
            <div className='tool' onClick={()=>handleDeleteComp(id)}><i class="ri-delete-bin-line"></i></div>
        </div>
    </div>
  )
}

export default CompletedTodoList