
// ' '가 포함되어있는지 확인
export function containSpace(text){
    const space_regex = /\s/;
    return typeof text === 'string' && space_regex.test(text);
}

export function notNull(input){
    if(input.trim() !== '') return true;
}

//문자열 타입 확인
export function sensing(text,language){
    if(typeof text !== 'string' && text.trim() !== '' && !text) return false;

    const eng_regex = /[a-zA-Z]/;   //RegExp 객체

    switch (language){
        case 'en':
            return eng_regex.test(text);
    }
}

//이메일 타입 확인
/* {2,}: 최소 2개의 알파벳 문자,$ : 문자열의 끝 */
export function isEmail(email){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}