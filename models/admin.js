const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    sh: {
        facebook: String,
        instagram: String,
        youtube: String,
        quora: String,
        phone: Number,
        whatsapp: Number,
        logo_cover: String,
        siteweb:String,

    }
});

const Theme = mongoose.model('Theme', adminSchema);

module.exports = Theme;
