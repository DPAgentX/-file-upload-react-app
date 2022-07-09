require('dotenv').config();
const { s3Upload } = require('./s3Service');
const express = require('express');
// const fs = require('fs')
var busboy = require('connect-busboy');
const File = require('./Models/File');
const multer = require("multer");
const path = require('path');
// const upload = multer({ dest: "uploads/" });;
const storage = multer.memoryStorage();
const fileFilter = (req, res, cb) => {
    cb(null, true);

}
const upload = multer({
    storage,
    fileFilter
})

const mongoose = require('mongoose');
const indexRouter = require('./Routes/indexRouter');
const { ProcessCredentials } = require('aws-sdk');
const app = express();
app.use(busboy());
// const bodyParser = require('body-parser')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => { console.log("error is" + error) });
db.once('open', () => {
    console.log(`server is running on ${process.env.DATABASE_URL}:${process.env.PORT}`);
});



app.use(express.static(path.resolve(__dirname, "./Client/build")));



app.use(express.urlencoded({ extended: true }));


async function uploadFiles(req, res) {
    try {
        const fileToUpload = req.files[req.files.length - 1];
        const result = await s3Upload(fileToUpload);
        console.log(result);
        const file = new File({
            originalFileName: fileToUpload.originalname,
            fileType: fileToUpload.mimetype,
            path: fileToUpload.path
        });
        await file.save();
        res.status(200);
        res.json({ result: result, message: "Successfully uploaded file" });
    }
    catch (e) {
        console.error(e)
        res.json({ Error: JSON.stringify(e) });
    }


}
app.post("/upload", upload.array("files"), uploadFiles);
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./Client/build", "index.html"))
// })
app.use('/', indexRouter);
const port = process.env.PORT
app.listen(port);