import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

const app = express();
app.use(cors());
app.use(
  fileUpload({
    limits: {
      files: 10,
      fileSize: 5 * 1024 * 1024,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Health check.");
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

app.listen(8080, () => {
  console.log(`Server is listening on port 8080`);
});
