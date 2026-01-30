import app from "./app.js";

process.loadEnvFile(".env.local");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
