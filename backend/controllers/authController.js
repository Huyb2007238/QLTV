const User = require('../models/user');
const ListBorrow = require('../models/listBorrow')
const bcrypt = require("bcrypt");

const authController = {
    //register
    registerUser: async(req,res)=>{ 
        try {
            
            const newUser = await new User({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                position: req.body.position,
                phone: req.body.phone
            });
            
            const newListBorrow = await new ListBorrow({
                user :{
                    code : req.body.username,
                    fullname : req.body.name, 
                },
                books :[]
            });
        const listborrow = await newListBorrow.save();
        const user = await newUser.save();
        res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //LOGIN 
    loginUser: async(req ,res)=>  {
        try {
            const username = req.body.username; 
            const password =  req.body.password;
            
            const user = await User.findOne({username})
            if(!user){
                res.status(404).json("Wrong username!")
            }
            const validPassword = await password === user.password
            console.log(password, user.password, req.body.password)
            console.log(validPassword);
            if(!validPassword){
                res.status(404).json("Wrong password!")
            }
            
            if(user && validPassword ){
                res.status(200).json(user);
            }
            
        } catch (error) {
            res.status(500).json(error);
        }
    },

    userLogout: async(req, res) =>{
        // res.clearCookie("refeshToken");
        refeshTokens = refeshTokens.filters(token => token !== req.cookies.refeshToken);
        res.status(200).json("Logged out !");
    }
}

module.exports =authController;