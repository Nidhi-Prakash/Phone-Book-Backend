import express from "express";
// import cors from "cors";
import { userRouter } from "./routes/userRouter.js";
import { createDbConnection } from "./config/DbConnection.js";
import { contactsRouter } from "./routes/contactsRouter.js";

const app = express();

const PORT = 5000;

// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/user", userRouter);
app.use("/contacts", contactsRouter);

app.use(express.static("../phone-book/build"));
app.get("*", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

const runServer = async () => {
  await createDbConnection();
  app.listen(PORT);
};

runServer();
