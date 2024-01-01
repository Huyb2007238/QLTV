const Book = require('../models/books');

//[PUT] /books/
const addBook = async (req, res) => {
    const { idBook, nameBook, author, typeBook, shelf, quantity, image } =
        req.body;
    try {
        const add = await Book.create({
            idBook,
            nameBook,
            author,
            typeBook,
            shelf,
            quantity,
            image,
        });
        // console.log(add);
        return res.status(201).json(add);
    } catch (error) {
        return res.status(501).json(error);
    }
};
//[DELETE] /books/
const deleteBook = async (req, res) => {
    const { idBook } = req.body;
    try {
        const id = await Book.findByIdAndDelete(req.params.id);
        // console.log(id);
        return res.status(200).json(id);
    } catch (error) {
        return res.status(500).json(error);
    }
};


// [GET] /admin/books/:id/edit
// const editBook = async(req,res) =>{
//     const {idBook} = req.body
//     try {
//         const id = await Book.findById({idBook});
//         console.log(id)
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// }

const updateBook = async (req, res) => {
    const { idBook, nameBook, author, typeBook, shelf, quantity, image } =
        req.body;
    try {
        const edit = await Book.findOneAndUpdate(
            { idBook },
            { nameBook, author, typeBook, shelf, quantity, image },
            { new: true },
        );
        return res.status(200).json(edit);
    } catch (error) {
        return res.status(500).json(error);
    }
};
const findAllBook = async (req, res) => {
    let document = [];
    try {
        document = await Book.find({});
        // console.log(document);
        res.send({ document });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
//[GET] books/ nhớ chỉnh
const search = async (req, res) => {
    const { name } = req.query;
    console.log(name);
    try {
        const result = await Book.find({ $text: { $search: name }});
        console.log(result);
        console.log("hi");
        res.json({
            result,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};
const findBookID = async (req, res) => {
    try {
        const findbook = await Book.findById(req.params.id);
        // console.log(findBook);
        return res.status(200).json(findbook);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const findAuthor = async(req,res) =>{
    try {
        const findauthor =await Book.findOne({author})
        
    } catch (error) {
        
    }
}
module.exports = {
    addBook,
    deleteBook,
    updateBook,
    search,
    findBookID,
    findAllBook,
};
