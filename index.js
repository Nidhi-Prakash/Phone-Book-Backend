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
// app.use(
//   cors({
//     origin: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// // Remove this block, as `cors()` already manages these headers
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cors());

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
