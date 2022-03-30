const mongoose = require('mongoose'); 

const handleError = (res, error)=>{ //array function call from 
    
    if(error['errors'] != null){ //handle error from dynamic way
        const key = Object.keys(error['errors']); // key value pair so store dynamic value so using Array
        const errorFields = []; 
        key.forEach((key)=>{// here is loop and find filed where we getting eroor
            let field = error['errors'][key]; //so we are store as a error and key pair on array
            errorFields.push({ //then we add error i.e kind as 'title,name,phone number
                type: field['kind'],
                message: field['message']
            }); 
        }); 
        if(errorFields.length > 0){
            return res.status(400).send({
                status: false,
                message: errorFields
            }); 
        }
    }

    return res.status(500).send({
        status: false,
        message: error.message
    }); 
}

const handleObjectId = (id)=>{
    return mongoose.Types.ObjectId.isValid(id); 
}

module.exports = {
    handleError,
    handleObjectId
}