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
// import fileUpload from 'express-fileupload';
const app = express_1.default();
app.set("view engine", "ejs");
// app.get('/',(req,res)=>{
//     console.log(req.body);
//     let index = fs.readFile('index.html', 'utf8',(err,data)=>{
//         res.send(data);
//     })
// })
// app.get('/',(req,res)=>{
//     const list = fs.readdir('./public/uploads','buffer', (err, listOfNames)=>{
//         if(err){
//             console.log("there is no file in folder");
//         }else{
//             // res.send(listOfNames);
//         }
//     })
//     // res.render('index');
// })
// app.use(express.static("public"));
app.get("/", (req, res, next) => {
    next();
});
app.get("/", (req, res) => {
    let list = fs.readdir("./public/uploads", "utf8", (err, listofnames) => {
        if (!err) {
            res.render("upload", { data: listofnames });
        }
    });
});
app.listen(8080);
