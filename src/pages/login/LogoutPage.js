import React, { useEffect } from "react";
import { loginController } from "../../contorller/loginController";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../etc/LoadingPage";

function LogoutPage(){

    const navigate = useNavigate();
    
    const logout =async (e) => {

        localStorage.removeItem('authToken');
        navigate('/',{replace:true});
    };  

    useEffect(()=>{
        console.log('Logout_ing');
        logout();
    },[])

    return(
        <LoadingPage/>
    );
}

export default LogoutPage;