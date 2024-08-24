import { useState, useEffect } from 'react';

/* 인증된 사용자인지 확인하는  */
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        return !!localStorage.getItem('authToken');
    });

    /* 여러 창으로 로그인 사용 시 동시 적용되게 */
    useEffect(() => {
        //authToken의 변화를 감지하여 isAuthenticated 상태를 업데이트
        const handleAuthChange = () => {
            setIsAuthenticated(!!localStorage.getItem('authToken'));
        };

        window.addEventListener('storage', handleAuthChange);   //storage 이벤트 리스너를 등록, storage 이벤트는 localStorage나 sessionStorage에서 데이터가 변경될 때 발생

        return () => {
            window.removeEventListener('storage', handleAuthChange);
        };
    }, []);

    return isAuthenticated;
};