
const express = require('express');
const router = express.Router();
const bookController = require("../controllers/bookController");
const borrowController = require("../controllers/borrowController")
const userController = require("../controllers/userController")
const siteController = require('../controllers/siteController');
const listBorrowController  = require('../controllers/listBorrowController');
const authController = require("../controllers/authController");


router.post('/books/edit', bookController.addBook);
router.put('/books/:id/edit', bookController.updateBook);
router.delete('/books/:id',bookController.deleteBook);
router.get('/books/:id/edit',bookController.findBookID);



router.put('/user/:id/edit', userController.editUser);
router.get('/user/:id/edit', userController.findUserID);
router.delete('/user/:id',userController.deleteUser);

// router.post('/borrow/:id/edit', borrowController.editBorrow);
// router.get('/borrow/:id/edit', borrowController.displayBorrowInfo);
// router.post('/borrow/edit', borrowController.addBorrow);
// router.get('borrow',borrowController.)
// router.post('/listBr/edit',listBorrowController.addListBorrow);

// router.post("/books/store", bookController.store);
router.post('/borrows/:id',listBorrowController.addBorrow)
router.put('/borrows/:id/edit',listBorrowController.updateBorrow)
router.delete('/borrows/:id',listBorrowController.deleteBorrow)
router.get('/borrows/:id/edit',listBorrowController.findBorrowID)
// router.get('/borrows/:id/edit',listBorrowController.findBorrowDetail)


router.get('/books', siteController.index_Book);
router.get('/users', siteController.index_User);
router.get('/borrow', siteController.index_Borrow);
router.get('/listBorrow',siteController.index_ListBorrow);


router.post("/register", authController.registerUser);
module.exports = router;
