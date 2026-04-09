import "dotenv/config";
import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const port = 3000;
const host = "localhost";

app.use(express.static("public"));
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
