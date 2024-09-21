import { translationController } from "../../../hooks/controller/translationController";

// Create New Story By Words ( Clova Studio API )
export const getContentApi = async (wordList) => {
    try {
        const firstContentId = Object.keys(wordList)[0]; // 첫 번째 contentId 가져오기
        console.log('wordList: '+wordList[firstContentId]);
        const response = await translationController(`/api/con`, 'post',wordList);
        if (response && response.data) {
            console.log('Create New Story: '+response.data.result.message.content);
            return response.data;
        } else if (response.status === 204) {
            alert('response Error.');
            return false;
        } 
    }catch(e){
      alert('에러가 발생했습니다.');
      console.log('error - {}',e);
      return false;
    }     
};