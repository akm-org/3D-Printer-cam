const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");

let latestImage = null;
const upload = multer();

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("frame"), (req, res) => {
  if (!req.file) return res.status(400).send("No image received");
  latestImage = req.file.buffer;
  res.send("OK");
});

app.get("/stream.jpg", (req, res) => {
  if (!latestImage) return res.status(404).send("NO_FRAME");
  res.writeHead(200, {
    "Content-Type": "image/jpeg",
    "Content-Length": latestImage.length
  });
  res.end(latestImage);
});

app.listen(process.env.PORT || 10000, () =>
  console.log("Server running")
);
