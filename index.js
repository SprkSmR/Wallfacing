import express from "express";
import multer from "multer";
import fs, { mkdir } from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;
const upload = multer({ storage: multer.memoryStorage() });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var postList = [];
var currentPaging = 0;

function Post(postTitle, postImage, postBody, postAuthor, postDescription){
    this.postTitle = postTitle;
    this.postImage = postImage;
    this.postBody = postBody;
    this.postAuthor = postAuthor;
    this.postDescription = postDescription;
    this.postTime = new Date();
}

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {postList: postList});
});

app.get("/browse{/:paging}", (req, res) => {
    currentPaging = req.params.paging ?? 0;
    console.log("Current paging "+currentPaging);
    res.render("browse.ejs", {postList: postList, paging: currentPaging});
});

app.get("/view-post/:id", (req, res) => {
    let currentPost = postList[req.params.id];
    res.render("view-post.ejs", {post: currentPost});
});

app.get("/create-post", (req, res) => {
    res.render("create-post.ejs");
});

app.post("/create-post", upload.single("postImage"), (req, res) => {
    let fileExt = req.file.mimetype.split('/')[1];
    let fileName = `${Date.now()}.${fileExt}`;
    let filePath = `public/uploads/${fileName}`;
    let newPost = new Post(
            req.body["postTitle"] , 
            fileName,
            req.body["postBody"], 
            req.body["postAuthor"], 
            req.body["postDescription"]
        )
    fs.writeFileSync(filePath, req.file.buffer);
    postList.push(newPost);
    console.log(newPost);
    res.redirect("/browse");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

let server = app.listen(port, () => {
    console.log("Now hosting!");
});

process.on('SIGINT', clearFiles);

function closeServer() {
    server.close(function () {
        console.log("Server closed!");
    });
}

function clearFiles() {
    let uploadFileRoute = `${__dirname}/public/uploads/`;

    //the nesting below is horrible
    fs.readdir(uploadFileRoute, (err, files) => {
        if (err) {
            console.log("No folder available");
        } else{
            if (!files.length){
                console.log("No files detected");
                closeServer();
                process.exit();
            }
        }
    }); 

    fs.rm(uploadFileRoute, {recursive: true, force: true}, (err) => {
        if (err) {
            console.log(err);
        }
        else{
            console.log("Uploaded files deleted")
            fs.mkdir(uploadFileRoute, (err) => {
                if (err) {
                    console.log(err);
                }
                else{
                    console.log("Uploads folder created again.");
                    closeServer();
                    process.exit();
                }
            });
        }
    });  
}