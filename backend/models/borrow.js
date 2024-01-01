const mongoose = require ("mongoose");
const mongooseDelete = require ("mongoose-delete");

const borrowSchema = new mongoose.Schema({
    idBorrow: {type: String, required: true},
    username: {type: String, required: true},
    idBook: {type: String, required: true },
    dateBorrow: {type: Date, default:Date.now()},
    dateDue: {type: Date, required: true},
    dateReturn:{type: Date, required: true},
    trangthai:{type:String, require:  true},
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
},{collection: 'Borrow'});

borrowSchema.plugin(mongooseDelete,{
    deletedAt: true,
    overrideMethods:true
})

module.exports = mongoose.model('Borrow',borrowSchema);