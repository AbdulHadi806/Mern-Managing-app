import React from 'react'

function Login({ submitFormHandler, title,userName, setUserName, password, setPassword }) {
    return (
        <>
            <h2 className='text-[#fff] text-[21px] text'>{title}</h2>
            <form onSubmit={e => { submitFormHandler(e) }}>
                <div className='flex flex-col gap-2'>
                    <input type="text" placeholder='Name' className='px-3 py-1 rounded-[3px]' value={userName} onChange={e => { setUserName(e.target.value) }} />
                    <input type="text" placeholder='Password' className='px-3 py-1 rounded-[3px]' value={password} onChange={e => { setPassword(e.target.value) }} />
                </div>
                <button type='submit' className='text-[#000]'>Submit</button>
            </form>
        </>
    )
}

export default Login
