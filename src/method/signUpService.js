import React, { useState } from "react";


export const emailVail = (value) => {
    //이메일 형식 확인
}

export const userPwVail = (value) => {
    return value.length < 12 ? false : true;
}

export const birthVail = (value) => {
    if(value.length < -1) return false;
    return true;
}

// export const signUpVaildation = () => {
    
//     const [inputErrors,setInputErrors] = useState({
//         email : '',
//         userPw: '',
//         birth: '',
//         country: '',
//         nickname: '',
//     });



//     return false;
// }