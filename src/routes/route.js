const express = require('express'); // Node framework and It is designed for building web applications and APIs
const router = express.Router(); //Use the express.Router class to create modular, mountable route handlers
/*require() function will automatically scan node_modules to find modules*/
const userController = require('../controller/user.controller');
const bookController = require('../controller/book.controller'); 
const reviewController = require('../controller/review.controller'); 
//functions that have access to the request object ( req ), the response object ( res ), 
//and the next function in the application's request-response cycle
const authMiddleware = require('../middleware/auth.middleware');
//POST method sends data to the server.
router.post('/register', userController.userRegister); 
router.post('/login', userController.login); 

router.post('/book', authMiddleware.auth, bookController.createBook); 
router.get('/books', authMiddleware.auth, bookController.getBooks);//GET request,is requesting data from a specified source
router.get('/books/:bookId', authMiddleware.auth, bookController.getBooksByIdWithReviews); 

router.put('/books/:bookId', authMiddleware.auth, bookController.updateByBookId); //used to send data to the API to update
router.delete('/books/:bookId', authMiddleware.auth, bookController.deleteBookById); 

// router for review

router.post('/books/:bookId/review', authMiddleware.auth, reviewController.addReview); 
router.put('/books/:bookId/review/:reviewId', authMiddleware.auth, reviewController.updateReview);
router.delete('/books/:bookId/review/:reviewId', authMiddleware.auth, reviewController.deleteReview); 


module.exports = router; 