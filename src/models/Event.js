const mongoose = require('mongoose');
const eventsSchema = new mongoose.Schema({
    eventID:String,
    link:String,
    title:String,
    subtitle:String,
    data:Date,
    hour:String,
    price:String,
    urls:Array,
    status:String,
    location:Object, /*{
        type: mongoose.Schema.Types.Mixed,
        ref: 'Location'
    },*/
    promoter: Object/*{
        type: mongoose.Schema.Types.Object,
        ref: 'Promoter'
    }*/,
    picture:String, //obrazek wyrozniajacy
    promotion:String,//to chyba nie potrzebne tutaj
    color:String,
    category:String,
    tags:Array,
    description:String //to dac jako array
});
mongoose.model('Event', eventsSchema);
