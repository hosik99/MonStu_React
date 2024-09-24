
//Handle Response Status
export function responseStatus(response,data=null){

    let result = { success : false, message : 'No Response'};

    if(!response) return result;

    switch (response.status) {
        case 200:   //HttpStatus.OK
        case 201:   //HttpStatus.CREATED
        case 202:   //HttpStatus.ACCEPTED
            result = { 
                success : true, 
                message : response.data?.stateMessage || 'Succesful'
            };  
            break; 
        default:
            result = { 
                success : false, 
                message : response.data?.error || `Unexpected Error: ${response.status}`
            };
            break; 
    }
    return addData(result,data);;
}

//Handle Response Error Status
export function errorStatus(error){

    let result = { success : false, message : 'Null Error'};
    if(!error || !error.response) return result;

    switch(error.response.status){
        case 400:   //HttpStatus.BAD_REQUEST
            result = { 
                success : false, 
                message : error.response.data?.error || 'Bad Request'
            };
            break; 
        case 401:   //HttpStatus.UNAUTHORIZED
            result = { 
                success : false, 
                message : error.response.data?.error || 'Unauthorized'
            };
            break; 
        case 403:   //HttpStatus.FORBIDDEN
            result = { 
                success : false, 
                message : error.response.data?.error || 'Forbidden. You do not have access'
            };
            break; 
        case 404:   //HttpStatus.NOT_FOUND
            result =  { 
                success : false, 
                message : error.response.data?.error || 'Not Found.'
            }; 
            break; 
        case 500:   //HttpStatus.INTERNAL_SERVER_ERROR
            result =  { 
                success : false, 
                message : error.response.data?.error || 'Internal Server Error. Please try again later'
            }; 
            break; 
        default:   
            result =  { 
                success : false, 
                message : error.response.data?.error || `An unexpected error occurred. ${error.response.data.error}`
            }; 
            break; 
    }

    return result;
}

//Add to result if data exists
function addData(result,data) {
    return data ? result = { ...result, 'data': data } : result;
}
