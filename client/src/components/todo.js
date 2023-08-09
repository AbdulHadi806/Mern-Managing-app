import React, { useEffect, useState } from 'react'
import { useDeleteTodoMutation, useAddSubTasksMutation, useUpdateTodoMutation, useUpdateSubTasksMutation } from '../redux/apiCalls/todoApi';
import Subtasks from './subtasks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faCheck, faList, faLocationArrow, faTrash } from '@fortawesome/free-solid-svg-icons'

function Todo({ item }) {
  const [subtask, setSubTask] = useState("")
  const [showTask, setShowTask] = useState(false)
  const [addSubTodo, setAddSubTodo] = useState(false)
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [addSubTasks] = useAddSubTasksMutation()
  const [updateSubTasks] = useUpdateSubTasksMutation()
  const showTaskHandler = () => {
    setShowTask(!showTask)
  }
  const subTaskHandleSubmit = (id) => {
    addSubTasks({ id: id, subtask: subtask })
  }
  const updateHandler = (id) => {
    updateTodo({id, type: "MAIN_TODO"});
  };
  const deleteHandler = (id) => {
    deleteTodo(id);
  };
  const addSubTasksHandler = () => {
    setAddSubTodo(!addSubTodo)
  }
  const updateTodoBySubTaskHandler =  (id) => {
       updateTodo({id, type: "SUB_TASK"});
  }
  const updateSubTasksHandler = (subID, TaskID) => {
    updateSubTasks({ subID, TaskID })
  }
  useEffect(() => {
    updateTodoBySubTaskHandler(item._id);
  }, [item.subtasks]);

  return (
    <li className='border-2 rounded bg-[#e3e3e3] border-[#000] mx-8 my-5 py-8'>
      <div style={item.done == true ? { background: "#c4e1e5" } : { background: "#fff" }} className='flex border-1 border-[#9b9c9c] flex-wrap rounded border justify-between items-center h-[60px] px-[20px] my-3 mx-[39px]'>
        <span className='text-[16px]'>{item.data}</span>
        <div className='flex gap-[10px]'>
          <button onClick={e => { e.preventDefault(); updateHandler(item._id) }} className='h-[38px] border-1 bg-[#1d1ba4] w-[50px] border-[#cad9d3] text-white rounded'><FontAwesomeIcon icon={faCheck} /></button>
          <button onClick={e => { e.preventDefault(); deleteHandler(item._id) }} className='h-[38px] border-1 bg-[#1d1ba4] w-[50px] border-[#cad9d3] text-white rounded'><FontAwesomeIcon icon={faTrash} /></button>
          <button onClick={addSubTasksHandler} className='h-[38px] border-1 bg-[#1d1ba4] w-[50px] border-[#cad9d3] text-white rounded'><FontAwesomeIcon icon={faLocationArrow} /></button>
        </div>
      </div>
      <form onSubmit={e => { e.preventDefault(); subTaskHandleSubmit(item._id) }} style={addSubTodo ? { display: "flex" } : { display: "none" }} className='gap-4 mb-2 px-10 justify-center'>
        <input onChange={e => { setSubTask(e.target.value); }} type="text" placeholder='Add SubTasks' className='border-1 border-[#9b9c9c] p-4 outline-0 border w-[100%] h-[42px] rounded-[3px]' />
        <button type="Submit" className='bg-[#2061cb] hover:bg-[#0d48a9] ease-in duration-100 text-white h-[42px] rounded-[3px] w-[80px] text-[18ox]'><FontAwesomeIcon icon={faAdd} /></button>
      </form>
      <div className='flex justify-end px-[40px]'>
      <button className='font-bold' onClick={showTaskHandler}><FontAwesomeIcon icon={faList}/></button>
      </div>
      <ul className='px-[40px]' style={showTask ? { display: "none" } : { display: "block" }}>
        {
          item.subtasks.map((i) => {
            return (<li key={i._id} style={i.done ? { background: "rgb(0 80 210)", color: "#fff" } : { background: "#fff", color: "#000" }} className='border border-2 text-white flex justify-between px-5 items-center py-2 my-1'><Subtasks item={i} /> <button className='h-[38px] border-1 bg-[#1d1ba4] hover:bg-[#2061cb] w-[53px] border-[#cad9d3] text-white rounded' onClick={e => {updateSubTasksHandler(i._id, item._id);}}><FontAwesomeIcon icon={faCheck}/></button> </li>)
          })
        }
      </ul>
    </li>
  )
}

export default Todo
