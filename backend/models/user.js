const mongoose = require("mongoose");
const  mongooseDelete = require ("mongoose-delete");

const userSchema = new mongoose.Schema({
    username :{ type: String, require: true, unique : true},
    password :{ type: String, require: true},
    name :{ type: String, require: true},
    position :{ type: String },
    phone:{type: String, maxlength: 11, require: true},
},{collection: 'Users'})

userSchema.plugin(mongooseDelete,{
    deletedAt: true,
    overrideMethods:true
})



module.exports = mongoose.model('Users',userSchema);
