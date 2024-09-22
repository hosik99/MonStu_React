
//Handle Response Status
export function responseStatus(response){
    if(!response) return { success : false, message : 'No Response'};

    switch (response.status) {
        case 200:   //HttpStatus.OK
        case 201:   //HttpStatus.CREATED
        case 202:   //HttpStatus.ACCEPTED
            return { 
                success : true, 
                message : response.data.stateMessage || 'Succesful'
            };  
        
        default:
            return { 
                success : false, 
                message : response.data.error || `Unexpected Error: ${response.status}`
            };
    }
}

//Handle Response Error Status
export function errorStatus(error){
    if(!error) return { success : false, message : 'Null Error'};

    switch(error.response.status){
        case 400:   //HttpStatus.BAD_REQUEST
            return { 
                success : false, 
                message : error.response.data.error || 'Bad Request'
            };
        case 401:   //HttpStatus.UNAUTHORIZED
            return { 
                success : false, 
                message : error.response.data.error || 'Unauthorized'
            };
        case 403:   //HttpStatus.FORBIDDEN
            return { 
                success : false, 
                message : error.response.data.error || 'Forbidden. You do not have access'
            };
        case 404:   //HttpStatus.NOT_FOUND
            return { 
                success : false, 
                message : error.response.data.error || 'Not Found.'
            }; 
        case 500:   //HttpStatus.INTERNAL_SERVER_ERROR
            return { 
                success : false, 
                message : error.response.data.error || 'Internal Server Error. Please try again later'
            }; 
        default:   
            return { 
                success : false, 
                message : error.response.data.error || `An unexpected error occurred. ${error.response.data.error}`
            }; 
    }
}

