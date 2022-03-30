const userSchema = require('../model/user.model'); 
const httpService = require('../services/http-errors.service');
const tokenService = require('../services/token.service');
const bcrypt = require('bcrypt'); 

const userRegister = async (req, res)=>{
    try {
        const data = req.body; 
        const dataRes = await userSchema.create(data);  // create a new filed
        return res.status(201).send({
            status: true,
            message: 'Data inserted successfully !',
            data: dataRes
        }); 
    } catch (error) {
        httpService.handleError(res, error); // handle error from http-errors-service file.
    }
}

const login = async (req, res)=>{
    try {
        const { email, password } = req.body; 
        const emailRes = await userSchema.findOne({email: email});// find those match with validation
        if(!emailRes){ // not present then use is not equal to
            return res.status(404).send({
                status: false,
                message: 'Invalid username and password !' //wrong email
            }); 
        }
        bcrypt.compare(password, emailRes.password).then((result)=>{// here using for matching password and email
            if(!result){
                return res.status(404).send({
                    status: false,
                    message: 'Invalid username and password !' //wrong password
                }); 
            }
            const token = tokenService.createToken(emailRes._id); 
            return res.status(200).send({
                status: true,
                message: token
            });
        }).catch((error)=>{
            return res.status(500).send({
                status: false,
                message: error.message
            }); 
        }); 
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        }); 
    }
}

module.exports = {
    userRegister,
    login
}

