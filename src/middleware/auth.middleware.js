const tokenService = require('../services/token.service'); 
const userSchema = require('../model/user.model'); 

const auth = async (req, res, next)=>{
    try {
        /**
         * The default name for a token in the headers of an HTTP request is "access-token".
         *  If there is no token provided with the request the server sends back an error. 
         *  401 unauthorized status with a response message of ‘No token provided’. 
         * If the token exists, the jwt.verify() method will be called
         */
        const token = req.headers['access-token']; 
        if(!token){
            return res.status(400).send({
                status: false,
                message: 'Token must be required !'
            }); 
        }
        const decodedToken = await tokenService.verifyToken(res, token); //Verify the token using jwt.verify method
        if(decodedToken != undefined){
            const userRes = await userSchema.findById(decodedToken.userId); 
            if(!userRes){
                return res.status(401).send({
                    status: false,
                    message: 'Unauthenticated !'
                });
            }
            next(); //next() : It will run or execute the code after all the middleware function is finished
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
}

module.exports = {
    auth
}