import React, { useEffect, useState } from 'react'
import { useLoginUserMutation } from '../redux/apiCalls/todoApi';
import { Link, useNavigate } from 'react-router-dom';

function Login({ title}) {
    const [loginUser, {data: userToken}] = useLoginUserMutation()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
    const submitLoginHandler = async (e) => {
        e.preventDefault();
        try {
          const loginData = {
            userName: userName,
            password: password,
          };
          if (!loginData.userName || !loginData.password) {
            return console.log("Could Not send Data");
          }
          await loginUser(loginData);
          navigate("/todos")
          setPassword("");
          setUserName("");
        } catch (err) {
          console.log(err, " Something went Wrong");
        }
      };
      useEffect(() => {
        if (userToken) {
          const token = userToken.token;
          console.log(token, "at tolen at tolen at tolen 222")
          localStorage.setItem('access_token', token); 
        }
      }, [userToken]);
    return (
        <>
            <h2 className='text-[#fff] text-[21px] text'>{title}</h2>
            <form onSubmit={e => { submitLoginHandler(e) }}>
                <div className='flex flex-col gap-2'>
                    <input type="text" placeholder='Name' className='px-3 py-1 rounded-[3px]' value={userName} onChange={e => { setUserName(e.target.value) }} />
                    <input type="text" placeholder='Password' className='px-3 py-1 rounded-[3px]' value={password} onChange={e => { setPassword(e.target.value) }} />
                </div>
                <button type='submit' className='text-[#fff]'>Submit</button>
            </form>
            <p className='text-[#fff]'>Don't have an account. <Link to="/" className='text-[#54d648]'>Sign Up</Link></p>
        </>
    )
}

export default Login
