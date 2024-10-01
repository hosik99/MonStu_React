import { errorStatus, responseStatus } from "../../util/handleStatus";
import {connectSpring} from "../preAxios";
import Cookies from 'js-cookie';

export const loginController = (url,type='get',data=null) => {

    const baseUrl = '/auth';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}

export const save = async (email,memberPw) => {
    try {
        const response = await loginController('/login','post',{
            email: email,
            memberPw: memberPw,
        });
        // localStorage.setItem('authToken', response.data.token); //Login Token setting
        // setAuthToken(response.data.token); // 쿠키에 토큰 설정
        return responseStatus(response);
    } catch (error) {
        return errorStatus(error);
    }
};  

// // 인증 토큰을 쿠키에 저장하는 함수
// const setAuthToken = (token) => {
//     Cookies.set('authToken', token, { 
//         expires: 1,
//         secure: true,
//         sameSite: 'Strict'
//     });
// };
