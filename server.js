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
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = express_1.default();
app.use(express_fileupload_1.default());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// app.post('/upload-file', (req, res) => {
//     // req.files.upload
//     // let ts = (req.files) ? fs.writeFile(req.files.upload.name, req.files.upload.data, (err) => console.log(err)) : null;
//     if (req.files) { console.log(req.files.upload); }
//     else { res.status(400).send("NOTHIING UPLOADED"); }
// })
app.post('/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    else {
        let sampleFile = req.files.sampleFile;
        if (!(sampleFile instanceof Array)) {
            fs.writeFile('test.jpg', sampleFile.data, (err) => { console.log(err); });
        }
        // res.send("did go through");
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // Use the mv() method to place the file somewhere on your server
    // sampleFile.mv('/somewhere/on/your/server/filename.jpg', function (err) {
    //     if (err)
    //         return res.status(500).send(err);
    //     res.send('File uploaded!');
    // });
});
app.listen(8080);
