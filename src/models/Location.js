const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
    name:String,
    street:String,
    postalCode:String,
    city:String,
    picture:String,
    SEOType:String,
    longitude:String,
    latitude:String
});
mongoose.model('Location', locationSchema);
