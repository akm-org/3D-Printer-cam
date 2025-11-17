import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let latestImage = null;
const upload = multer();

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("frame"), (req, res) => {
  if (!req.file) {
    console.log("No file received in upload");
    return res.status(400).send("No image received");
  }
  latestImage = req.file.buffer;
  console.log(`Image received: ${req.file.buffer.length} bytes`);
  res.send("OK");
});

app.get("/stream.jpg", (req, res) => {
  if (!latestImage) {
    return res.status(404).send("NO_FRAME");
  }
  res.writeHead(200, {
    "Content-Type": "image/jpeg",
    "Content-Length": latestImage.length,
    "Cache-Control": "no-cache, no-store, must-revalidate"
  });
  res.end(latestImage);
});

app.get("/latest.jpg", (req, res) => {
  if (!latestImage) {
    return res.status(404).send("NO_FRAME");
  }
  res.writeHead(200, {
    "Content-Type": "image/jpeg",
    "Content-Length": latestImage.length,
    "Cache-Control": "no-cache, no-store, must-revalidate"
  });
  res.end(latestImage);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
