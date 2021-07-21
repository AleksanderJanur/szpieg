/*
const express = require('express');
const mongoose = require('mongoose');

const Event = mongoose.model('Event');

const router = express.Router();

router.post('/events',async(req,res)=>{
    const {events} = req.body;
    try{
        const eventSchema = new Event(events);
        await eventSchema.save();
        res.status(200).send(events);
    } catch (err) {
        res.status(422).send({ error: err.message+"Pierwszy POST" });
    }

});

module.exports = router;*/
