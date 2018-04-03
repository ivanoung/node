"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// import multer from "multer";
// interface cacheContent {
//   (s: string):(y: ReadableStream)
// }
// Init cache
const caches = {};
// Init express
const app = express_1.default();
app.use(express_fileupload_1.default());
// Setting views, and pathing for views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));
// Serving static page
// app.use(express.static(path.join(__dirname, "/public")));
// Setting homepage
app.get("/", (req, res) => {
    // let stat = fs.stat('./public/uploads/hotchick.jpg',(err, stats)=>{
    //   console.log(stats.mtime);
    // })
    let list = fs.readdir(path.join(__dirname, "/public/uploads"), "utf8", (err, listofnames) => {
        if (!err) {
            console.log(listofnames);
            res.render("upload", { data: listofnames });
        }
        else {
            res.render("upload", { data: ["Threre is nothing inside the list"] });
        }
    });
});
// Routing for uploading file/folder, one by one
app.post("/upload", (req, res) => {
    // console.log(req.files);
    let inputNameField = "uploadFile";
    if (JSON.stringify(req.files) == "{}") {
        res.status(400).end("No files were uploaded");
    }
    else if (req.files) {
        let file;
        file = req.files[inputNameField];
        console.log(file);
        fs.writeFile(`${__dirname}/public/uploads/${file["name"]}`, file.data, err => {
            if (!err) {
                // Try
                let list = fs.readdir(path.join(__dirname, "/public/uploads"), "utf8", (err, listofnames) => {
                    if (!err) {
                        res.render("upload", { data: listofnames });
                    }
                    else {
                        res.render("upload", {
                            data: ["Threre is nothing inside the list"]
                        });
                    }
                });
                // End of try
            }
            else {
                res.send("error");
            }
        });
    }
});
app.get('/uploads/:filename', (req, res) => {
    if (!(caches[req.params.filename])) {
        let requestFile = `${__dirname}/public/uploads/${req.params.filename}`;
        res.setHeader('Content-disposition', 'attachment; filename=' + path.basename(requestFile));
        fs.readFile(requestFile, (err, buffer) => {
            console.log("Saved in cache");
            caches[req.params.filename] = buffer;
            res.send(buffer);
        });
        console.log("Cache loaded");
        console.log(caches);
        // (caches[req.params.filename]).pipe(res);
    }
    else {
        console.log('run this');
        res.send(caches[req.params.filename]);
        // (caches[req.params.filename]).pipe(res);
    }
    // res.download(`${__dirname}/public/uploads/${req.params.filename}`);
});
app.listen(8080, () => console.log(`Server running on port 8080`));
// Set Storage Engine
// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function(req, file, callback){
//         callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//     }
// });
// Init upload variable
// const upload = multer({
//     storage: storage
// }).single('uploadFile');
// (req.files instanceof fileUpload.FileArray && req.files.uploadFile instanceof fileUpload.FileArray) {
//   let saveFile = req.files.uploadFile;
//   saveFile.mv(`./public/uploads/${req.files.name}`, err => {
//     if (err) {
//       res.status(500).end(err);
//     } else {
//       res.send("Operation Done");
//     }
//   });
// }
