class httpError extends Error{
  constructor(message,statuscode){
     this.super(message)
      statuscode=statuscode
  }
}

export default httpError;