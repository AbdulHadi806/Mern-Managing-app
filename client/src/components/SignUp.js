import React, { useEffect, useState } from 'react'
import { usePostUserMutation } from '../redux/apiCalls/todoApi';
import { Link, useNavigate } from 'react-router-dom';

function SignUp({ title,loginUser }) {
  const [postUser] = usePostUserMutation()
    const [userNameSign, setUserNameSign] = useState("")
    const [passwordSign, setPasswordSign] = useState("")
    const navigate = useNavigate();
      const submitRegistrationHandler = async (e) => {
        try {
          e.preventDefault();
          const registrationData = {
            userName: userNameSign,
            password: passwordSign,
          };
          if (!registrationData.userName || !registrationData.password) {
            return console.log("Could Not send Data");
          }
          const mutationResult = await postUser(registrationData)
          if(mutationResult.data.status == true) {
            navigate("/login")
          }
          setPasswordSign("");
          setUserNameSign("");
        } catch (err) {
          console.log(err, " Something went Wrong");
        }
      };
    return (
        <>
            <h2 className='text-[#fff] text-[21px] text'>{title}</h2>
            <form onSubmit={e => { submitRegistrationHandler(e) }}>
                <div className='flex flex-col gap-2'>
                    <input type="text" placeholder='Name' className='px-3 py-1 rounded-[3px]' value={userNameSign} onChange={e => { setUserNameSign(e.target.value) }} />
                    <input type="text" placeholder='Password' className='px-3 py-1 rounded-[3px]' value={passwordSign} onChange={e => { setPasswordSign(e.target.value) }} />
                </div>
                <button type='submit' className='text-[#fff]'>Submit</button>
            </form>
            <p className='text-[#fff]'>Already have an account. <Link to="/login" className='text-[#54d648]'>Login</Link></p>
        </>
    )
}

export default SignUp
