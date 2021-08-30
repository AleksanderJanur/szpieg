const mongoose = require('mongoose');
const finalFormSchema = new mongoose.Schema({
    title:String,
    event: {
        type: mongoose.Schema.Types.Array,
        ref: 'Event',
        unique: true,
    },
    addedDate:Date
});
mongoose.model('Title', finalFormSchema);
