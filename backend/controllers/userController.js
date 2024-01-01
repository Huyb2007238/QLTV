const User = require("../models/user")
const listBorrow = require("../models/listBorrow")

const addUser = async (req, res) => {
    const {username,password,name,position,phone    } =req.body;
    try {
        const add = await User.create({username,password,name,position,phone})
        console.log(add);
        return res.status(201).json(add)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteUser = async (req,res) => {
    try {
        console.log(req.params);
        const id = await User.findByIdAndDelete(req.params.id);
        
        return res.status(200).json(id)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const editUser = async (req,res) =>{
    const {username,password,name,position,phone} = req.body;
    console.log(req.body);
    try {
        const edit =await User.findOneAndUpdate({username},{password,name,position,phone}, {new: true});
        return res.status(200).json(edit)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const editUserpassword = async (req,res) =>{
    const {username,password,newpassword} = req.body;
    console.log(username,password,newpassword);
    try {
        const user = await User.findOne({username})
        console.log(user);

        if(user){
            const value = await password === user.password
            console.log(value);
            if(value){
                user.password = newpassword
                await user.save();
                res.status(200).json(username)
                console.log(user);
            }
            
        }
        else res.status(404).json("User not found!!")
    } catch (error) {
        return res.status(500).json(error)
    }
}
const findUser = async(req,res) =>{
    let document = [];
    try {
        const {username} = req.body;
        if(username){
            document=await User.findOne({"$text": {"$search" : username}});
        }
        else {
            document = await User.find({});
        }
        res.json(document);
    } catch (error) {
            return res.status(500).json(error);
    }
}
const findUserID = async(req, res) =>{
    try {
        const find = await User.findById(req.params.id)
        return res.status(200).json(find)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const findBorrowUser = async(req,res) =>{
    try {
        const user = await User.findById(req.params.id)
        const borrow = await listBorrow.find(user.username)
        if(user && borrow){
            console.log("hêlo");
        }
    } catch (error) {
        return res.status(500).json(error)
    }

}

const countusr = async(req, res)=>{
    try {
        const user = await listBorrow.count()
        return res.status(200).json(user)
    } catch (error) {
        
    }
}
module.exports = {addUser,findUser,findUserID,deleteUser,editUser,editUserpassword,findBorrowUser,countusr};