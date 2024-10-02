
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