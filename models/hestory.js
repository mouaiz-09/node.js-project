const mongoose = require('mongoose');
const shema = mongoose.Schema;
const hstoryshema = new shema(
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
        type:String|| "hestory",

    }
);
const hstory = mongoose.model('hest', hstoryshema);
module.exports= hstory;