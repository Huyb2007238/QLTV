
// const siteRouter = require('./site.route');
// const booksRouter = require('./books.route');
const express = require('express');
const adminRouter = require('./admin.route');
const userRouter = require('./user.route');

function route(app) {
    //admin
    app.use('/admin', adminRouter);
    //user
    app.use('/user', userRouter);
    // app.use('/books', booksRouter);

}

module.exports = route;
