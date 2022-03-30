const express = require('express'); 
require('dotenv').config(); // Storing configuration in the environment separate from code
const bodyParser = require('body-parser'); //if you used post request so you will need the body of the request,
// so you will need body-parser,four express middlewares for parsing text, JSON, 
//url-encoded and raw data set through an HTTP request body
const mongoose = require('mongoose'); 
const router = require('./routes/route'); 

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));  

mongoose.connect(process.env.MONGODB_CLUSTER).then(()=>{
    console.log("Mongodb is connected !"); 
}).catch((error)=>{
    console.log(error)
});

app.use('/', router); 

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on Port ${process.env.PORT || 3000}`); 
}); 