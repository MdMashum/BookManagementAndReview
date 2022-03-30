const jwt = require('jsonwebtoken');//to share security information between two parties — a client and a server.
//securely transferring data within parties using a JSON object
require('dotenv').config();// Storing configuration in the environment separate from code
const create = (userId) => { 
    return jwt.sign({ // create token
        //jwt. sign function takes the payload, secret and options as its arguments.
        //  The payload can be used to find out which user is the owner of the token.
        //  Options can have an expire time until which token is valid
        userId: userId
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}
/**
 * @jwt.verify(token, secretOrPublicKey, callback) callback is an Asynchronous so we use Promiss
 */
const verify = (res, token) => {
    return new Promise((resolve, reject) => {//It takes up to two arguments: callback functions for the success and failure cases of the Promise
        //you use process.env.JWT_SECRET_KEY to tell your application to take Environment Variable.
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decodedToken) => { // verifying token
            if (error) {
                return res.status(401).send({
                    status: false,
                    message: error.message
                });
            }
            else {
                resolve(decodedToken); 
            }
        });
    });
}



module.exports = {
    createToken: create,
    verifyToken: verify
}