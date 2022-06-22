import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute() {
    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to="/login" replace={true} />

}


//<Route exact path="/">
// {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
//</Route>