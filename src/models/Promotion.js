const mongoose = require('mongoose');
const finalFormSchema = new mongoose.Schema({
    promotionType:{
        type: String,
        unique: true,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.Array,
        ref: 'Event',
        unique: true,
    }
});
mongoose.model('Promotion', finalFormSchema);
