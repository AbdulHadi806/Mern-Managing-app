import React, {  useState } from 'react'
import { usePostTodoMutation } from '../redux/apiCalls/todoApi'

function Form() {
    const [text, setText] = useState("")
    const [postTodo] = usePostTodoMutation()

    const submitTodo =  (e) => {
        e.preventDefault();
         postTodo(text)
    }
    const handleTodoChange = (e) => {
        setText(e.target.value)
    }
  return (
     <form onSubmit={submitTodo} className='flex gap-4 px-10 justify-center'>
        <input onChange={handleTodoChange} placeholder='Add Todo' type="text" className='border-1 border-[#9b9c9c] p-4 outline-0 border w-[100%] h-[42px] rounded-[3px]'/>
        <button type="Submit" className='bg-[#2061cb] hover:bg-[#0d48a9] ease-in duration-100 text-white h-[42px] rounded-[3px] w-[160px] text-[18ox]'>Add Todo</button> 
     </form>
  )
}

export default Form
