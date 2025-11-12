import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

var postList = [];

function Post(postTitle, postImage, postBody, postAuthor, postDescription){
    this.postTitle = postTitle;
    this.postImage = postImage;
    this.postBody = postBody;
    this.postAuthor = postAuthor;
    this.postDescription = postDescription;
    this.postTime = new Date();
}

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {postList: postList});
});

app.get("/browse", (req, res) => {
    res.render("browse.ejs", {postList: postList});
})

app.get("/view-post/:id", (req, res) => {
    let currentPost = postList[req.params.id];
    res.render("view-post.ejs", {post: currentPost});
})

app.get("/create-post", (req, res) => {
    res.render("create-post.ejs");
})

app.post("/create-post", (req, res) => {
    let newPost = new Post(
            req.body["postTitle"] , 
            req.body["postImage"], 
            req.body["postBody"], 
            req.body["postAuthor"], 
            req.body["postDescription"]
        )
    postList.push(newPost);
    console.log(newPost);
    res.redirect("/browse");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.listen(port, () => {
    console.log("Now hosting!");
});