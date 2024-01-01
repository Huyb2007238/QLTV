
const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");
const borrowController = require('../controllers/borrowController');
const userController = require('../controllers/userController')

router.post("/login", authController.loginUser);


router.post('/:id/edit', userController.editUserpassword);

router.post('/books/borrow', borrowController.addBorrow);
router.get('/', bookController.findAllBook);

router.get('/books/:id', bookController.findBookID);
router.get('/search/query', bookController.search)

// router.get('/:id',userController.findUser)

router.get('/:id/edit', userController.findBorrowUser)
router.get('/countusr',userController.countusr)

module.exports = router;

// router.post("/logout",middlewareController.verifyToken,authController.loginUser);

