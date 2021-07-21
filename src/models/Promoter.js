const mongoose = require('mongoose');
const promoterSchema = new mongoose.Schema({
    name: String,
    link: String,
    picture:String
});
mongoose.model('Promoter', promoterSchema);
