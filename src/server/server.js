require('../models/Event');
require('../models/Promotion');
require('../models/Location');
require('../models/Promoter');
require("dotenv").config();
console.log("Dupa")
const fs = require("fs")
const upload = require("../routes/upload");
const Grid = require("gridfs-stream");
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const app = express()
const mongoose = require('mongoose');
const port = process.env.PORT || 5000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
    const {link,title,subtitle,data, hour, price,urls,
        status, locationName,locationStreet,locationPostalCode,locationCity,
        locationPicture,locationSEOType,locationLongitude,locationLatitude,
        promoterName,promoterLink,promoterPicture, picture, promotion, color, category, tags} = req.body;
    try{
        const locPic = 'img-'+locationPicture;
        const location = new Location({name:locationName,street:locationStreet,postalCode:locationPostalCode,
            city:locationCity,picture:locPic,SEOType:locationSEOType,longitude:locationLongitude,latitude:locationLatitude})
        const promPic = 'img-'+promoterPicture;
        const promoter = new Promoter({name:promoterName,link:promoterLink,picture:promPic});
        const pic = 'img-'+picture;
        const eventSchema = new Event({link,title,subtitle,data,hour,price,urls,status,location,promoter,picture:pic,color,category,tags});
        await eventSchema.save();
        await location.save();
        await promoter.save();
        res.status(200).json({eventSchema,location,promoter});
/*        console.log("Sukces"+eventSchema)*/
    } catch (err) {
        res.status(422).send({ error: err.message+"Pierwszy POST" });
    }

});
router.get('/events',async(req,res)=>{
    const events = await Event.find();

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
