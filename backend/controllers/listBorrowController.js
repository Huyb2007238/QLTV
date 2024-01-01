const listBorrow = require('../models/listBorrow');
// const ListBorrow = require('../models/listBorrow');

const addBorrow = async (req, res) => {
    const { user, books } = req.body;
    try {
        const add = await listBorrow.findById(req.params.id);
        req.params.id
        // if (!add) {
        //     // If the record doesn't exist, create a new one
        //     const newRecord = new listBorrow({
        //         user,
        //         books
        //     });
        //     await newRecord.save();
        //     return res.status(200).json(newRecord);
        // }

        // If the record exists, update the books array
        let anotherBooks = add.books.concat(books);
        add.books = anotherBooks.slice();

        // Check if the record is modified before saving
        if (add.isModified('books')) {
            await add.save();
        }

        return res.status(200).json(add);
    } catch (error) {
        return res.status(500).json(error);
    }
};


const updateBorrow = async (req, res) => {
    const { user, books } = req.body;
    try {
        const edit = await listBorrow.findOneAndUpdate(
            { user   },
            { books },
            { new: true },
        );
        console.log(edit);
        return res.status(200).json({edit});
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteBorrow = async (req, res) => {
    try {
        const id = await listBorrow.findByIdAndDelete(req.params.id);
        // console.log(id);
        return res.status(200).json(id);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const  findBorrowID = async (req, res) => {
    try {
        const findborrow = await listBorrow.findById(req.params.id);
        // console.log(findBook);
        return res.status(200).json(findborrow);
    } catch (error) {
        return res.status(500).json(error);
    }
};
const findBorrowDetail = async (req, res) => {
    const { user, books } = req.body;
    try {
        const usr = await listBorrow.findOne({user});
        if (usr) {
            console.log(usr);
            const borrow = await usr.books.id(req.params.id);
            return res.status(200).json(borrow);
        }
    } catch (error) {res.status(500).json(error)}
};


module.exports = { addBorrow, updateBorrow, deleteBorrow, findBorrowID, findBorrowDetail };
