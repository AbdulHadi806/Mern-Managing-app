import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/form';
import Todos from './components/todos';
import {  useIsLoggedInMutation, useIsLoggedOutMutation, useLoginUserMutation, usePostUserMutation } from './redux/apiCalls/todoApi';
import Login from './components/login';

function App() {
  const [userNameSign, setUserNameSign] = useState("")
  const [passwordSign, setPasswordSign] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [postUser] = usePostUserMutation()
  const [loginUser, {data: testData}] = useLoginUserMutation()
  const [isLoggedOut] = useIsLoggedOutMutation()
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
      await postUser(registrationData);
      setPasswordSign("");
      setUserNameSign("");
    } catch (err) {
      console.log(err, " Something went Wrong");
    }
  };
  const logOutHandler = () => {
    isLoggedOut()
    localStorage.removeItem('access_token');
  }
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
      setPassword("");
      setUserName("");
    } catch (err) {
      console.log(err, " Something went Wrong");
    }
  };

  useEffect(() => {
    if (testData) {
      const token = testData.token;
      localStorage.setItem('access_token', token);
    }
  }, [testData]);


  return (
    <div className='bg-[#2061cb] h-[100vh] max-w-[100vw]  pt-[40px]'>
      <div className="App">
        <button onClick={logOutHandler}>Log Out Account Button</button>
        <div className='flex flex-col items-center justify-end px-9 pb-3'>
          <Login title={"Sign Up"} submitFormHandler={submitRegistrationHandler} password={passwordSign} userName={userNameSign} setPassword={setPasswordSign} setUserName={setUserNameSign} />
          <Login title={"Login"} submitFormHandler={submitLoginHandler} password={password} userName={userName} setPassword={setPassword} setUserName={setUserName} />
        </div>
        <h1 className='text-[#2061cb] bg-white text-center text-[38px] font-semibold'> App </h1>
        <div className="px-[20px] lg:px-[450px] mt-5 text-center mx-auto">
          <div className='bg-white text-center rounded  pt-[26px] pb-5'>
            <Form />
            <Todos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
