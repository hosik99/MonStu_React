import { aiContentController } from "../../../hooks/api/controller/aiContentController";

//사용자의 모든 AiContent 가져오기
export const getAllAiContent = async (setContentList) => {
    try {
        const response = await aiContentController(`/getAll`, 'get',null);
        if (response && response.data) {
            console.log('AiContents: '+response.data.aiContentDTOList);
            setContentList(response.data.aiContentDTOList);
        } 
    }catch(e){
      alert('에러가 발생했습니다.');
      console.log('error - {}',e);
    }     
};

//하나의 AiContent 삭제
export const delAiContent = async (id) => {
    try {
        const response = await aiContentController(`/del`, 'post',id);
        if (response && response.data) {
        }
    }catch(e){
      alert('에러가 발생했습니다.');
      console.log('error - {}',e);
    }     
};
