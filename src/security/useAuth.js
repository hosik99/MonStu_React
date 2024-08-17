import { useState, useEffect } from 'react';

/* 인증된 사용자인지 확인하는  */
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        return !!localStorage.getItem('authToken')
    });

    // useEffect(() => {
    //     const token = localStorage.getItem('authToken');
    //     if (token) {
    //         setIsAuthenticated(true);
    //     }
    // }, []);

    return isAuthenticated;
};