import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter.js";
import { createDbConnection } from "./config/DbConnection.js";
import { contactsRouter } from "./routes/contactsRouter.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: [
      "https://phone-book-frontend-gamma.vercel.app/",
      "http://localhost:5000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

app.use("/user", userRouter);
app.use("/contacts", contactsRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../phone-book/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../phone-book/build/index.html"));
});

const runServer = async () => {
  await createDbConnection();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

runServer();
