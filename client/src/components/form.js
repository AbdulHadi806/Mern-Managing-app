import React, { useEffect, useState } from 'react'
import { useGetUserQuery,  usePostTodoMutation } from '../redux/apiCalls/todoApi'
import { useNavigate } from 'react-router-dom';
function Form() {
  const [text, setText] = useState("")
  const [postTodo] =  usePostTodoMutation()
  const {data:userData} = useGetUserQuery()
  const navigate = useNavigate()
  const submitTodo = async (e) => {
    e.preventDefault();
    await postTodo(text)
  }
  const handleTodoChange = (e) => {
    setText(e.target.value)
  }
  useEffect(() => {
    console.log(userData)
  }, [])
  const logOutHandler = () => {
     localStorage.removeItem('access_token');
    navigate("/login")
  }
  return (
    <form onSubmit={submitTodo} className='flex pb-1 justify-center items-center flex-col'>
      <h1 className='text-white'>UserName: <span className='font-semibold'>{userData && userData.user}</span></h1>
      <button onClick={logOutHandler}>Log Out Account Button</button>
      <div  className='flex gap-1 mt-3 px-10 justify-center w-[100%]'>
        <input onChange={handleTodoChange} placeholder='Add Todo' type="text" className='border-1 border-[#9b9c9c] p-4 outline-0 border w-[100%] h-[42px] rounded-[3px]' />
        <button type="Submit" className='bg-[#1a3b70] hover:bg-[#0d48a9] ease-in duration-100 text-white h-[42px] rounded-[3px] w-[160px] text-[18ox]'>Add Todo</button></div>
    </form>
  )
}

export default Form
