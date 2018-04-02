import express from "express";
// import multer from "multer";
import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import * as bodyParser from "body-parser";
import { serveStatic } from "serve-static";
import fileUpload from "express-fileupload";

// Init express
const app = express();
app.use(fileUpload());

// Setting views, and pathing for views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));

// Serving static page
app.use(express.static(path.join(__dirname, "/public")));

// Setting homepage
app.get("/", (req, res) => {
  let list = fs.readdir(
    path.join(__dirname, "/public/uploads"),
    "utf8",
    (err, listofnames) => {
      if (!err) {
        res.render("upload", { data: listofnames });
      } else {
        res.render("upload", { data: ["Threre is nothing inside the list"] });
      }
    }
  );
});

// Routing for uploading file/folder, one by one
app.post("/upload", (req, res) => {
  console.log(req.files);

  if (JSON.stringify(req.files) == "{}") {
    res.status(400).end("No files were uploaded");
  } else if (req.files instanceof fileUpload.FileArray && req.files.uploadFile instanceof fileUpload.FileArray) {
    let saveFile = req.files.uploadFile;
    saveFile.mv(`./public/uploads/${req.files.name}`, err => {
      if (err) {
        res.status(500).end(err);
      } else {
        res.send("Operation Done");
      }
    });
  }
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
