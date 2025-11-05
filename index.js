import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/browse", (req, res) => {
    res.render("browse.ejs");
})

app.get("/view-post", (req, res) => {
    res.render("view-post.ejs");
})

app.listen(port, () => {
    console.log("Now hosting!");
});