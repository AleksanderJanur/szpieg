require('../models/Event');
require('../models/Promotion');
require('../models/Location');
require('../models/Promoter');
require('../models/Title');
require("dotenv").config();
const fs = require("fs")
const upload = require("../routes/upload");
const Grid = require("gridfs-stream");
const express = require('express')
const bodyParser = require('body-parser')

const path = require('path');
const app = express()
const mongoose = require('mongoose');
const port = process.env.PORT || 5000
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
const cors = require('cors')

app.use(cors()) // Use this after the variable declaration
const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.olhto.mongodb.net/myFirstDatabase?retryWrites=true';
if (!mongoUri) {
    throw new Error(
        `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
    );
}
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
    console.error('Error connecting to mongo', err);
});
/*app.use(express.static(path.join(__dirname + '/../../public/index.html')))*/
const Event = mongoose.model('Event');
const Location = mongoose.model('Location');
const Promotion = mongoose.model('Promotion');
const Promoter = mongoose.model('Promoter');
const Title = mongoose.model('Title');
const router = express.Router();
let gfs;
let conn = mongoose.createConnection(mongoUri);
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

app.use("/file", upload);
app.use('/api',router)

/*app.get('/',(req,res)=>{
    res.json({message:'Welcome to our API!'})
})*/
// media routes
app.get("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});

app.delete("/file/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});

router.post('/events',async(req,res)=>{
    const {added,link,title,subtitle,data, hour, price,urls,
        status, locationName,locationStreet,locationPostalCode,locationCity,
        locationPicture,locationSEOType,locationLongitude,locationLatitude,description,
        promoterName,promoterLink,promoterPicture, picture, color, category, tags,locationRegex,type,artist} = req.body;
/*    const streetRegex1 = locationStreet.replace("ul.","").replace("ul","").replace("al.","").replace("al","").replace(/[0-9]/g, '').replace(" ","")
        .toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")*/
    const events = await Event.find({locationRegex:locationRegex,data:data})
    if(events.length===0){
    try{
/*        const locationRegex = locationStreet.replace("ul.","").replace("ul","").replace("al.","").replace("al","").replace(/[0-9]/g, '').replace(" ","")
            .toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")*/
        const location = new Location({name:locationName,street:locationStreet,postalCode:locationPostalCode,
            city:locationCity,picture:added==='byXml'?locationPicture:'file/img-'+locationPicture,
            SEOType:locationSEOType,longitude:locationLongitude,latitude:locationLatitude,locationRegex:locationRegex})
/*        const promoter = new Promoter({name:promoterName,link:promoterLink,picture:added==='byXml'?promoterPicture:'file/img-'+promoterPicture});*/
        const eventSchema = new Event({link,title,subtitle,data,hour,price,urls,description,status,location/*,promoter*/,picture:added==='byXml'?picture:'file/img-'+picture,color,category,tags,
            addedDate:new Date(),locationRegex:locationRegex,type,artist});
        await eventSchema.save();
        await location.save();
/*        await promoter.save({ "upsert": true });//?*/
        res.status(200).json({eventSchema,location/*,promoter*/}); //promoter na razie nie, bo wszyscy sa tacy sami
    } catch (err) {
        res.status(422).send({ error: err.message+"Coś poszło nie tak" });
    }

}
    else{
        console.log("Jest już taki event")
        if(events.length>1){
            console.log("We have some duplicate")
        }
        const tickets = await Event.updateOne(
            {urls:{$nin:[urls]},_id:events[0]._id},
            {$push: {'urls':urls}});
        console.log("Bilety",tickets,"URL",urls)
        res.status(200).send(tickets);
    }

}
);
router.post('/titles',async(req,res)=> {
        const titles = await Title.find({title: req.body.title})
        if(titles.length === 0) {
            try {
/*
                const location = new Location({name:req.body.event.locationName,street:req.body.event.locationStreet,
                    postalCode:req.body.event.locationPostalCode, city:req.body.event.locationCity,picture:req.body.event.added==='byXml'?req.body.event.locationPicture:'file/img-'+req.body.event.locationPicture,
                    SEOType:req.body.event.locationSEOType,longitude:req.body.event.locationLongitude,latitude:req.body.event.locationLatitude,
                    locationRegex:req.body.event.locationRegex})
                const promoter = new Promoter({name:req.body.promoterName,link:req.body.promoterLink,picture:req.body.added==='byXml'?req.body.promoterPicture:'file/img-'+req.body.promoterPicture});
*/
                const titlesSchema = new Title({title: req.body.title, event: req.body.event,addedDate:new Date()});
                await titlesSchema.save();
                res.status(200).send(titlesSchema);
                console.log("Sukces")
            }
            catch (err) {
                res.status(422).send({error: err.message + "Coś poszło nie tak"});
            }
        }
        else {
            if(titles.length>1){
                console.log("We have some duplicate")
            }
            console.log("Już jest taki title   "+req.body.title)
            const updateTitles = await Title.updateOne(
                {event:{$nin:[req.body.event]},_id:titles[0]._id},
                {$push:{'event':req.body.event}}
            );
            res.status(200).send(updateTitles)
        }
    }
);
router.get('/titles',async(req,res)=>{
    const titles = await Title.aggregate([{$match:{'event.picture':{$ne:""}}}, {$sample: { size: 10 } }])
/*    await Title.find().sort({title:1});*/



    //.limit(10)
    res.send(titles);
})
router.get('/events',async(req,res)=>{
    let events = await Event.find({'location.city':"Gdańsk"}).sort({addedDate:-1}).limit(10)
    let events2 = await Event.find({'location.city':"Warszawa"}).sort({addedDate:-1}).limit(10)
    let events3 = await Event.find({'location.city':"Kraków"}).sort({addedDate:-1}).limit(10)
    let events4 = await Event.find({'location.city':"Poznań"}).sort({addedDate:-1}).limit(10)
    let events5 = await Event.find({'location.city':"Katowice"}).sort({addedDate:-1}).limit(10)
    let events6 = await Event.find({'location.city':"Szczecin"}).sort({addedDate:-1}).limit(10)
    events.push(...events2)
    events.push(...events3)
    events.push(...events4)
    events.push(...events5)
    events.push(...events6)
    events.sort((a,b)=>a.addedDate-b.addedDate)
    console.log("Ogolny /events")
    //To jest do strony głownej trzeba bedzie jakos ogarnac te gety
    /*const events = await Event.find({})*/

    res.send(events);
})
router.get('/events/city/:city',async(req,res)=>{
    function diacriticSensitiveRegex(string = '') {
        return string.replace(/a/g, '[a,ą]')
            .replace(/e/g, '[e,ę]')
            .replace(/n/g, '[n,ń]')
            .replace(/o/g, '[o,ó]')
            .replace(/c/g, '[c,ć]')
            .replace(/z/g, '[z,ż,ź]')
            .replace(/s/g, '[s,ś]')
            .replace(/l/g, '[l,ł]')
    }
    const events = await Event.find({'location.city': {$regex: diacriticSensitiveRegex(req.params.city), $options: 'i'}}).limit(50).sort({addedDate:-1})
    console.log("city",req.params.city)
    res.send(events);
})

router.get('/events/title/:title',async(req,res)=>{
    const events = await Event.find({title:req.params.title}).sort({addedDate:-1});
    console.log(req.params.title)
    res.send(events);
})

router.get('/locations',async(req,res)=>{
    const loc = await Location.find();

    res.send(loc);
})
router.post('/updateEvent', async (req, res) => {
    const event = await Event.updateOne(
        { _id: req.body.eventID },
        {$set: req.body.myJson});
/*    const loc = await Location.updateOne(
        { _id: req.body.locationID},
        {$set:{name:req.body.myJson.location.locationName,
                street:req.body.myJson.location.locationStreet,
                postalCode:req.body.myJson.location.locationPostalCode,
                city:req.body.myJson.location.locationCity,
                picture:req.body.myJson.location.locationPicture,
                SEOType:req.body.myJson.location.locationSEOType,
                longitude:req.body.myJson.location.locationLongitude,
                latitude:req.body.myJson.location.locationLatitude}}
    );*/
    const prom = await Promoter.updateOne(
        { _id: req.body.myJson.promoter._id},
        {$set:{name:req.body.myJson.promoter.name,
                link:req.body.myJson.promoter.link,
                picture:req.body.myJson.promoter.picture
                }}
    );
    res.send({event,prom});
});
router.post('/updateLocation', async (req, res) => {
    const loc = await Location.updateOne(
        { _id: req.body.myJson._id},
        {$set:{name:req.body.myJson.name,
                street:req.body.myJson.street,
                postalCode:req.body.myJson.postalCode,
                city:req.body.myJson.city,
                picture:req.body.myJson.picture,
                SEOType:req.body.myJson.SEOType,
                longitude:req.body.myJson.longitude,
                latitude:req.body.myJson.latitude}}
    );
    res.send(loc);
});
router.post('/deleteEvent', async (req, res) => {

    const event = await Event.remove(
        { _id: req.body.id });
    res.send(event);
});
router.post('/deleteLocation', async (req, res) => {
    const loc = await Location.remove(
        { _id: req.body.id });
    res.send(loc);
});
router.post('/promotions',async(req,res)=>{
    console.log(req.body.myJson.event.title+'Olek')
    let json = req.body.myJson.event
    try{
/*        const eventSchema = new Event({json});*/
        const arr = []
        arr.push(json)
        const promotionSchema = new Promotion({promotionType:req.body.myJson.promotionType, event:arr});
        await promotionSchema.save();
        res.status(200).send(promotionSchema);
    } catch (err) {
        res.status(422).send({ error: err.message+"Pierwszy POST" });
    }

});
router.post('/updatePromotion', async (req, res) => {
    const id = await Promotion.findOne({ promotionType:req.body.myJson.promotionType });
    console.log(id+"OlekTest")
    const promotion = await Promotion.updateOne(
        {_id:id._id  },
        {$push: {'event':req.body.myJson.event}});
    console.log(promotion)
    res.send(promotion);
});
const pathToIndex = path.join(__dirname, "/../../public/index/html")
app.get("/", (req, res) => {
    const raw = fs.readFileSync(pathToIndex)
    const pageTitle = "Homepage - Welcome to my page"
    const updated = raw.replace("__PAGE_META__", `<title>${pageTitle}</title>`)
    res.send(updated)
})
//
app.use(express.static(path.join(__dirname + '/../../public/index.html')))
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/../../public//index.html"))
)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



/*      jakbym chcial tutaj dodawac eventy z id to sie przyda
        const locationRegex = req.body.myJson.locationStreet.replace("ul.","").replace("ul","").replace("al.","").replace("al","").replace(/[0-9]/g, '').replace(" ","")
            .toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
        const location = new Location({name:req.body.myJson.locationName,street:req.body.myJson.locationStreet,postalCode:req.body.myJson.locationPostalCode,
            city:req.body.myJson.locationCity,picture:req.body.myJson.added==='byXml'?req.body.myJson.locationPicture:'file/img-'+req.body.myJson.locationPicture,
            SEOType:req.body.myJson.locationSEOType,longitude:req.body.myJson.locationLongitude,latitude:req.body.myJson.locationLatitude,locationRegex:locationRegex})
        const promoter = new Promoter({name:req.body.myJson.promoterName,link:req.body.myJson.promoterLink,picture:req.body.myJson.added==='byXml'?req.body.myJson.promoterPicture:'file/img-'+req.body.myJson.promoterPicture});
        const eventSchema = new Event({link:req.body.myJson.link,title:req.body.myJson.title,subtitle:req.body.myJson.subtitle,data:req.body.myJson.data,
            hour:req.body.myJson.hour,price:req.body.myJson.price,urls:req.body.myJson.urls,status:req.body.myJson.status,location,promoter,picture:req.body.myJson.added==='byXml'?req.body.myJson.picture:'file/img-'+req.body.myJson.picture,
            color:req.body.myJson.color, category:req.body.myJson.category,tags:req.body.myJson.tags, addedDate:new Date(),locationRegex});
        await eventSchema.save();*/
