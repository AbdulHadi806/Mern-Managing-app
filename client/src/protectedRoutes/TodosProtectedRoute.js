import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


export default function TodosProtectedRoute() {
    const userToken = localStorage.getItem('access_token');
    const navigate = useNavigate();
    useEffect(() => {
        if (userToken == null) {
            navigate('/login', { replace: true })
        }
    }, [])

    return (
        <>
            <Outlet />
        </>
    )
}