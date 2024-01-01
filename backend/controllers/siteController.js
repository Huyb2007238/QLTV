const Book = require('../models/books');
const User = require('../models/user');
const Borrow = require('../models/borrow');
const listBorrow = require('../models/listBorrow')

const index_Book = async(req,res) =>{
        try {
            const books = await Book.find({});
            return res.status(200).json(books)
        } catch (error) {
            return res.status(500).json(error)
        }
}

const index_User = async(req,res) =>{
    try {
        const users = await User.find({});
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const index_Borrow = async(req,res) =>{
    try {
        const borrows = await Borrow.find({});
        return res.status(200).json(borrows)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const index_ListBorrow = async(req,res) =>{
    try {
        const borrow = await listBorrow.find({});
        return res.status(200).json(borrow)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports ={index_Book,index_Borrow,index_User,index_ListBorrow}
