const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const File = new Schema({
    originalFileName: { type: String, required: true },
    fileType: { type: String, required: true },
    path: { type: String, requied: true }
}, { timestamps: true })




module.exports = mongoose.model('File', File);