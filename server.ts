import express from "express";
import multer from "multer";
import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import * as bodyParser from "body-parser";
import { serveStatic } from "serve-static";
// import fileUpload from 'express-fileupload';

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

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
