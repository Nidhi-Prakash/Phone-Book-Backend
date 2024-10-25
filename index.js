import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter.js";
import { contactsRouter } from "./routes/contactsRouter.js";
import { createDbConnection } from "./config/DbConnection.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with options for specific origins
app.use(
  cors({
    origin: [
      "https://phone-book-frontend-gamma.vercel.app/",
      "https://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.use("/user", userRouter);
app.use("/contacts", contactsRouter);

// Serve static files if deployed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../phone-book/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../phone-book/build/index.html"));
  });
}

// Start the server and connect to the database
const runServer = async () => {
  await createDbConnection();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

runServer();
