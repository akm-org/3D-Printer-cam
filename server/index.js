import express from "express";
import multer from "multer";
import fs from "fs";

const upload = multer(); // memory storage

const app = express();
app.use(express.static("public"));

// Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file");

  fs.writeFileSync("./public/latest.jpg", req.file.buffer);
  res.send("OK");
});

// Default
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(10000, () => console.log("Server running"));
