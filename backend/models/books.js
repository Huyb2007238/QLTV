const mongoose = require ("mongoose");
const mongooseDelete = require ("mongoose-delete");

const bookSchema = new mongoose.Schema({
    idBook: {type: String, required: true, unique: true},
    nameBook: {type: String, required: true},
    author: {type: String, required: true},
    typeBook: {type: String, required: true},
    shelf: {type: String, required: true},
    quantity:{type: Number, required: true},
    image:{type: String, maxlength: 200},
}, {collection: 'Books'});

bookSchema.plugin(mongooseDelete,{
    deletedAt: true,
    overrideMethods:true
})

module.exports = mongoose.model('Books',bookSchema);
