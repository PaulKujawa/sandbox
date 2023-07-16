import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import { createServer } from "http";
import { Server } from "socket.io";

import postsLive from "./data/posts-live.json" assert { type: "json" };
import postsOld from "./data/posts-old.json" assert { type: "json" };

const app = express();
app.use(cors());
app.use(fileUpload({ limits: { files: 10, fileSize: 5 * 1024 * 1024 } }));

const server = createServer(app);
const ioServer = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET"],
  },
});

app.get("/", (req, res) => {
  res.send("Health check.");
});

// cursor-based pagination
app.get("/posts", (req, res) => {
  const limit = 10;
  const pivotId = req.query.cursor || postsOld[0].id;

  const pivotIdx = postsOld.findIndex((post) => post.id === pivotId);

  if (pivotIdx === -1) {
    return res.status(404).send("Not Found");
  }

  const nextIdx = pivotIdx + limit;

  return res.json({
    cursor: pivotId,
    cursorNext: nextIdx < postsOld.length ? postsOld[nextIdx].id : undefined,
    items: postsOld.slice(pivotIdx, nextIdx),
    limit,
  });
});

app.get("/posts/:id", (req, res) => {
  const post = postsOld.find((post) => post.id === req.params.id);

  if (post) {
    return res.json(post);
  }

  return res.status(404).send("Not Found");
});

app.post("/upload", (req, res) => {
  if (!req.files || !Object.keys(req.files).length) {
    return res.status(400).send("Not a file.");
  }

  // `file` is the chosen attribute in the request body
  const file = req.files.file as fileUpload.UploadedFile;

  // TODO found no config option for mimetype check
  if (!file.mimetype.startsWith("image/") && !file.mimetype.endsWith(".pdf")) {
    return res.status(400).send("Wrong mimetype.");
  }

  file.mv(`./public/${file.name}`, (err) => {
    if (err) return res.status(500).send(err);

    res.json(null);
  });
});

ioServer.on("connection", (socket) => {
  let cnt = 0;

  setTimeout(() => {
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * postsLive.length);
      const [randomPost] = postsLive.splice(randomIdx, 1);

      socket.emit("post-published", randomPost);
      if (cnt === postsLive.length - 1) clearInterval(interval);
      cnt++;
    }, 1500 + Math.random() * 6000);
  }, 3000);

  socket.on("disconnect", () => {});
});

server.listen(8080, () => {
  console.log(`Server is listening on port 8080`);
});
