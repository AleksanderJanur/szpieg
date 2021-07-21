const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: 'mongodb+srv://admin:passwordpassword@cluster0.olhto.mongodb.net/myFirstDatabase?retryWrites=true',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg","image.png","image.jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `img-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `img-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });
