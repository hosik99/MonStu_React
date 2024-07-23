import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "../security/useAuth"
/* ONLY AUTHENTICATED USERS */
/*
    { children } -> 객체 디스트럭처링(destructuring)을 사용
     props.children를 destructuring사용하면 { children }로 사용
*/
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
