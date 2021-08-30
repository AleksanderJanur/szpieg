const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
    name:String,
    street:String,
    postalCode:String,
    city:String,
    picture:String,
    SEOType:String,
    longitude:String,
    latitude:String,
    locationRegex:{
        type:String,
        unique: true
    }
});
mongoose.model('Location', locationSchema);
