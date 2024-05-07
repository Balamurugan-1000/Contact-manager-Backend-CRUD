import constants from "../constants.js";

const errorHandler = (err,req,res,next) => {
const statusCode = res.statusCode ? res.statusCode : 500;
switch (statusCode) {
    case constants.NOT_FOUND:
        res.json({title : "Not found",message : err.message , stackTrace : err.stack})
        break;

    case constants.VALIDATION_ERROR:
        res.json({title : "Validation -- Failed",message : err.message , stackTrace : err.stack})
        break;
    case constants.FORBIDDEN:
        res.json({title : "Forbidden",message : err.message , stackTrace : err.stack})
        break;
    case constants.UNAUTHORIZED:
        res.json({title : "Unauthorized",message : err.message , stackTrace : err.stack})
        break;
    
    case constants.INTERNAL_SERVER_ERROR:
        res.json({title : "INTERNAL_SERVER_ERROR",message : err.message , stackTrace : err.stack})
        break;
    
    default:
        // console.log("No Error All Clear")
        break;
}

}

export default errorHandler