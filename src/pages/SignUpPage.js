import React, { useState,useEffect } from "react";

import { loginController } from "../contorller/signUpController";
import { emailVail, signUpVaildation, userPwVail } from "../method/signUpService";

function SignUpPage(){
    
    const [formData,setFormData] = useState({
        email : '',
        userPw: '',
        birth: '',
        country: '',
        nickname: '',
    });

    const [dataVaild,setDataVaild] = useState({
        email : '',
        userPw: '',
        birth: '',
        country: '',
        nickname: '',
    });
    
    const [confirmPassword,setConfirmPassword] = useState('');

    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };

    const handleConPwChange = (event) => {
        setConfirmPassword(event.target.value)
    };

    const signUpSubmit = (event) => {
        event.preventDefault();

        if(!userPwVail(formData.userPw)){
            setDataVaild({
                ...dataVaild,
                [formData.userPw.key]:'12자 이상 입력해주세요.',
            });
        }
        console.log(dataVaild);        

    };

    // const fetchData = async () =>{
    //     try {
    //         const response = await loginController('/signup');
    //         console.log(response.data);
    //     } catch (error) {
    //         // setError(error);
    //     }
    // }
    // fetchData();


    return(
        <div>
            <form onSubmit={signUpSubmit}>
                <label>SignUp</label>
                <div>
                    <label>ID (email): </label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="userPw" value={formData.userPw} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>ConfirmPassword: </label>
                    <input type="password" value={confirmPassword} onChange={handleConPwChange}></input>
                </div>
                <div>
                    <label>Birthday: </label>
                    <input type="text" value={formData.birth} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Country: </label>
                    <input type="text" value={formData.country} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Nickname: </label>
                    <input type="text" value={formData.nickname} onChange={handleInputChange}></input>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpPage;