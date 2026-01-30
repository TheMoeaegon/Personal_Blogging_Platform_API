import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.end("okay");
});

export default app;
