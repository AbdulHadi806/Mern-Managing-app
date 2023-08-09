import { useEffect, useState } from 'react';
import './App.css';
import { useIsLoggedInMutation, useIsLoggedOutMutation, useLoginUserMutation, usePostUserMutation } from './redux/apiCalls/todoApi';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodosPage from './pages/TodosPage';
import SignUp from './components/SignUp';
import TodosProtectedRoute from './protectedRoutes/TodosProtectedRoute';

function App() {

  return (
    <div className='bg-[#2061cb] h-[100vh] max-w-[200vw]  pt-[40px]'>
      <Router>
        <div className=" max-w-[600px] mx-auto  pt-[40px]">
          <Routes>
            <Route path="/" element={<SignUp title={"Sign Up"} />}></Route>
            <Route path="/login" element={<Login title={"Login"} />}></Route>
            <Route element={<TodosProtectedRoute />}>
              <Route path="/todos" element={<TodosPage />} />
            </Route>
          </Routes>
        </div>
      </Router></div>
  );
}

export default App;
