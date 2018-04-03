import express from "express";
import * as hbs from 'hbs';
import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import * as mime from 'mime';
import * as bodyParser from "body-parser";
import { serveStatic } from "serve-static";
import fileUpload from "express-fileupload";


// Init cache
const caches: any = {};

// Init express
const app = express();
app.use(fileUpload());

// Setting views, and pathing for views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));

// Serving static page
// app.use(express.static(path.join(__dirname, "/public")));


function readDirectory(res: Response) {
  let list = fs.readdir(
    path.join(__dirname, "/public/uploads"),
    "utf8",
    (err, listofnames) => {
      if (!err) {
        console.log(listofnames);
        res.render("upload", { data: listofnames });
      } else {
        res.render("upload", { data: ["Threre is nothing inside the list"] });
      }
    }
  );
}


// Setting homepage
app.get("/", (req, res) => {

  fs.readdir(path.join(__dirname, "/public/uploads"), "utf8", (err, listofnames) => {
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
  let inputNameField = "uploadFile";
  if (JSON.stringify(req.files) == "{}") {
    res.status(400).end("No files were uploaded");
  } else if (req.files) {
    let file: any;
    file = req.files[inputNameField];
    console.log(file);
    fs.writeFile(
      `${__dirname}/public/uploads/${file["name"]}`,
      file.data,
      err => {
        if (!err) {
          // Try
          let list = fs.readdir(
            path.join(__dirname, "/public/uploads"),
            "utf8",
            (err, listofnames) => {
              if (!err) {
                res.render("upload", { data: listofnames });
              } else {
                res.render("upload", {
                  data: ["Threre is nothing inside the list"]
                });
              }
            }
          );
          // End of try
        } else {
          res.send("error");
        }
      }
    );
  }
});

app.get('/uploads/:filename', (req, res) => {

  if (!(caches[req.params.filename])) {
    let requestFile = `${__dirname}/public/uploads/${req.params.filename}`;

    res.setHeader('Content-disposition', 'attachment; filename=' + path.basename(requestFile));

    fs.readFile(requestFile, (err, buffer) => {
      caches[req.params.filename] = buffer;
      res.send(buffer);
    })

  }

  else {
    console.log('run this');
    res.send(caches[req.params.filename]);
  }
})

app.listen(8080, () => console.log(`Server running on port 8080`));
