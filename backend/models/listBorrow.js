const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const User = require("./user");

const ListBorrow = new mongoose.Schema({
    user:{
        code :{type:String, required:true, unique:true},
        fullname:{type:String, required:true},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
    },
    books: [
        {
            id: {type: String, required:true,unique:true},
            dateBorrow: { type: Date, default: Date.now() },
            dateDue: { type: Date},
            dateReturn: { type: Date },
            state: { type: Boolean, default : false},
        },
    ],
},{collection: 'ListBorrow'})

ListBorrow.plugin(mongooseDelete,{
    deletedAt: true,
    overrideMethods:true
})


module.exports = mongoose.model('ListBorrow',ListBorrow);
