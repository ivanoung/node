import express from 'express';
import multer from 'multer';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from "path";
import * as bodyParser from 'body-parser';
// import fileUpload from 'express-fileupload';

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

// Init upload
const upload = multer({
    storage: storage
}).single('myImage');

const app = express();
// app.use(fileUpload());


// Setup EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req,res)=>{res.render('index')})

app.post('/upload', (req, res)=>{
    upload(req, res,(err)=>{
        if (err){
            res.render('index', {
                msg: err
            });
        }else {
            console.log(req.file);
            res.send('test');
        }
    })
})

app.listen(8080, ()=> console.log(`Server started on port 8080`));





// ------------------------------------------------------------------------------------------------------------------------
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// })

// app.post('/upload-file', (req, res) => {

//     // req.files.upload
//     // let ts = (req.files) ? fs.writeFile(req.files.upload.name, req.files.upload.data, (err) => console.log(err)) : null;

//     if (req.files) { console.log(req.files.upload); }
//     else { res.status(400).send("NOTHIING UPLOADED"); }

// })

// app.post('/upload', function (req, res) {
//     if (!req.files)
//         return res.status(400).send('No files were uploaded.');
//     else {
//         let sampleFile = req.files.sampleFile;
//         if (! (sampleFile instanceof Array) ) {
//             fs.writeFile('test.jpg', sampleFile.data, (err) => { console.log(err) })
//         }

//         // res.send("did go through");
//     }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file


    // Use the mv() method to place the file somewhere on your server
    // sampleFile.mv('/somewhere/on/your/server/filename.jpg', function (err) {
    //     if (err)
    //         return res.status(500).send(err);

    //     res.send('File uploaded!');
    // });
// });



