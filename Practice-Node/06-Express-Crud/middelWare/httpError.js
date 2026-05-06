

class httpError extends Error{
    constructor (message,statuscode){
        super(message);
        statuscode=statuscode
    }
}

export default httpError;