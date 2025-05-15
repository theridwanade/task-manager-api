import "dotenv/config";
import express from "express";
import { connectdb } from "./util/connectdb";
import authRoutes from "./routes/auth.route";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";

const app = express();
const PORT = Number(process.env.PORT) || 3000;


app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
  connectdb();
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the server at: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
