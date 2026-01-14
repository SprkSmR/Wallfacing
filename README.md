# Wallfacing

## Why?
This is a somewhat complex-ish project I did for The Complete Web Development Bootcamp by Angela Yu. I've done it as 
a capstone project using a ton of stuff from pretty much all modules (HTML, CSS, JScript, EJS, Express).

So this is pretty much a final test on all the basics for me.

## How
This is a basic blog app, in which you can create posts, read them, see them feature and know more about the 
creator (that's me).

## Highlights
Here's a quick list of the stuff I'm the most proud of:
- Layout and styling. Though it looks basic (2000s internet type of stuff), it actually means a lot to me. I've 
always been a backend guy and dreaded most if not all of frontend. But this time, I actually did it. It's responsive, 
it doesn't look awful and I didn't do it "hacky" (or at least it didn't feel like it at the time). It actually turned
out the way I wanted to (that is, what I imagined were just wireframes scribbled down on post-its). 

- Graceful shutdown. That means I had to (re-)learn what graceful shutdown was. And actually implement it. It's done
so that it doesn't leave any ports hanging, it also clears all the uploaded images and keeps it nice and tidy.

- Image handling. Whenever a user creates a forum post, it uploads the image to my computer and then it uses that 
same image to display as a preview! (Of course there are like a thousand security risks for this approach, but for
a PoC it works ok). 

## Could improve
- Layout and styling. Yeah, I've got a lot to learn in this department.

- General storage. I should really be using databases, cloud buckets and the like, not storing it all as merely JSONs
and straight up files in a folder (in my PC). This is far from being actually production-ready.

- It's not CRUD, it's just... CR--? It lacks features. You cannot currently delete or update posts (hence the bad joke).
You should be also able to comment on them or something. Besides, there is no account handling of any sort.

## How to run:

```
npm i
nodemon index.js

```

Hope you find anything worthwhile in this project.

Best regards!

Omar
