const mongoose = require('mongoose');
const promoterSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: true
},
    link: String,
    picture:String
});
mongoose.model('Promoter', promoterSchema);
