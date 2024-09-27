import { errorStatus, responseStatus } from "../../util/handleStatus";
import {connectSpring} from "../preAxios";

export const signUpController = (url,type='get',data=null) => {

    const baseUrl = '/sign';

    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

//VERIFY EMAIL ALREADY EXISTS
export const checkEmail = async (email) => {
    try {
        const response = await signUpController(`/check`,'post',{
            'email' : email,
        });
        return responseStatus(response);
    } catch (error) {
        return errorStatus(error);
    }
};  

//SEND EMAIL CHECK CODE ,GET EMAIL CHECK CODE FROM SERVER
export const sendEmailCheck =async (email) => {
    try {
        const response = await signUpController('/emailcode','post',{
            'email' : email,
        });
        return responseStatus(response,response.data.checkCode);
    } catch (error) {
        return errorStatus(error);
    }
};  

//SENT FORM DATA TO SERVER
export const save =async (formData) => {
    try {
        const response = await signUpController('/signup','post',{
            memberDTO: {
                email: formData.email,
                memberPw: formData.memberPw,
            },
            memberInfoDTO: {
                birth: new Date(formData.birth),
                country: formData.country,
                nickname: formData.nickname,
            },
        });
        return responseStatus(response);
    } catch (error) {
        return errorStatus(error);
    }
};