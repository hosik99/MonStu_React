import {connectSpring} from "../preAxios";
import {responseStatus,errorStatus} from "../../util/handleStatus";

const contentController = (url,type='get',data=null) => {
    
    const baseUrl = '/member/content';

    if(type=='get') return connectSpring.get(baseUrl+url,data);
    if(type=='post') return connectSpring.post(baseUrl+url,data);
}

//save new content data
export const saveData =async (title,content) => {
    try {
        const response = await contentController('/add','post',{
            'title' : title,
            'content' : content,
        });
        return responseStatus(response);
    } catch (error) {
        return errorStatus(error);
    }
};  

//REQUEST CONTENT DATA TO SPRING 
export const getContent = async (id) => {
    try {
        const response = await contentController(`/${id}`, 'get', null);
        return responseStatus(response,response.data);
    } catch (error) {
        return errorStatus(error);
    }
};

//Get All Contents Data By User Email
export const getContents = async () => {
    try {
      const response = await contentController('/getContents', 'get', {});
      return responseStatus(response,response.data);
    } catch (error) {
      return errorStatus(error);
    }
  };