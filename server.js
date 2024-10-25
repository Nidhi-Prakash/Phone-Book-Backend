// import express from "express";
// import cors from "cors";
// import { userRouter } from "./routes/userRouter.js";
// import { createDbConnection } from "./config/DbConnection.js";
// import { contactsRouter } from "./routes/contactsRouter.js";

// const app = express();

// const PORT = 5000;

// app.use(
//   cors({
//     origin: "https://phone-book-frontend-gamma.vercel.app/",
//   })
// );
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Allow requests from all origins
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.use(express.json());
// app.use("/user", userRouter);
// app.use("/contacts", contactsRouter);

// app.use(express.static("../phone-book/build"));
// app.get("*", (req, res) => {
//   res.sendFile("public/index.html", { root: __dirname });
// });

// const runServer = async () => {
//   await createDbConnection();
//   app.listen(PORT);
// };

// runServer();

import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter.js";
import { createDbConnection } from "./config/DbConnection.js";
import { contactsRouter } from "./routes/contactsRouter.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Enable CORS with specific frontend origin and options for preflight requests
app.use(
  cors({
    origin: "https://phone-book-frontend-gamma.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/user", userRouter);
app.use("/contacts", contactsRouter);

// Serve static files for frontend deployment
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
