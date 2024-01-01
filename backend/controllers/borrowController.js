const Borrow = require('../models/borrow');
const User = require('../models/user');

const addBorrow = async (req, res) => {
    const {
        idBorrow,
        username,
        idBook,
        dateBorrow,
        dateDue,
        dateReturn,
        trangthai,
        
    } = req.body;
    try {
        const add = await Borrow.create({
            idBorrow,
            username,
            idBook,
            dateBorrow,
            dateDue,
            dateReturn,
            trangthai,
        });
        console.log(add);
        return res.status(201).json(add);
    } catch (error) {
        return res.status(500).json(error);
    }
};
// const addBorrow = async (req, res) => {
//     const {
//         idBorrow,
//         username,
//         idBook,
//         // dateBorrow,
//         // dateDue,
//         // dateReturn,
//         trangthai,
//     } = req.body;
//     try {
//         const add = await new Borrow ({
//             idBorrow: idBorrow,
//             username: username,
//             idBook: idBook,
//             // dateBorrow,
//             // dateDue,
//             // dateReturn,
//             trangthai: trangthai,
//         });
//         // console.log(add);
//         await add.save();
        
//         // thử thêm cho thằng nó r lấy id thằng đó kiểm tra đc k ok
//         const user = await User.findOne({username})
//         console.log(user);

//         await User.findOneAndUpdate({username: user},{
//             $push:{borrows : idBook}
//         })
//         return res.status(201).json(add);
        

//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };
const deleteBorrow = async (req, res) => {
    const { idBorrow } = req.body;
    try {
        const id = await Borrow.findOneAndDelete({ idBorrow });
        console.log(id);
        return res.status(200).json(id);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const editBorrow = async (req, res) => {
    
    const {
        idBorrow,
        username,
        idBook,
        dateBorrow,
        dateDue,
        dateReturn,
        trangthai,
    } = req.body;
    console.log(req.body);
    try {
        const edit = await Borrow.findOneAndUpdate(
            { idBorrow },
            { username, idBook, dateBorrow, dateDue, dateReturn, trangthai },
            { new: true },
        );
        return res.status(200).json(edit);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const findBorrow_idBook = async (req, res) => {
    let document = [];
    try {
        const { idBook } = req.body;
        if (idBook) {
            document = await Borrow.find({ $text: { $search: idBook } });
        } else {
            document = await Borrow.find({});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

const findBorrow_nameAuth = async (req, res) => {
    let document = [];
    try {
        const { username } = req.body;
        if (nameBorrow) {
            document = await Borrow.find({ $text: { $search: username } });
        } else {
            document = await Borrow.find({});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};
const findBookBorrow = async (req, res) => {
    try {
        const finduser = await User.findById(req.params.id);
        const bookborrows = await Book.aggregate({ $match: { userId: ObjectId(req.params.id) }})
        console.log(findBook);
        return res.status(200).json(findbook);
    } catch (error) {
        return res.status(500).json(error);
    }
};
const displayBorrowInfo = async (req, res) => {
    try {
        const userId = req.params.id; // Lấy id của người dùng từ URL
        console.log(userId);
        const user = await User.findById({_id: userId}).populate('borrowHistory'); // Sử dụng populate để lấy thông tin mượn
        console.log(user);
        if (!user) {
            return res.status(404).send('Không tìm thấy người dùng');
        }

        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy thông tin mượn');
    }
};
module.exports = {
    addBorrow,
    deleteBorrow,
    editBorrow,
    findBorrow_nameAuth,
    findBorrow_idBook,
    findBookBorrow,
    displayBorrowInfo,
};
