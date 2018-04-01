"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import fileUpload from 'express-fileupload';
const app = express_1.default();
app.set("view engine", "ejs");
app.use(express_1.default.static("./public"));
// app.get("/", (req, res, next) => {
//   next();
// });
// app.get("/", (req, res) => {
//   let list = fs.readdir("./public/uploads", "utf8", (err, listofnames) => {
//     if (!err) {
//       res.render("upload", { data: listofnames });
//     }
//   });
// });
app.listen(8080);
