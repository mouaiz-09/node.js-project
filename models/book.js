const mongoose = require('mongoose');
const shema = mongoose.Schema;
const bookshema = new shema(
    {
        id: Number,
        name: String,
        auter: String,
        yera: Number,
        scoor: Number,
        link: String,
        category: String,
        cover: String,
        dat: String,
        type: String || "hestory" , 

    }
);
const book = mongoose.model('book', bookshema);
module.exports = book;