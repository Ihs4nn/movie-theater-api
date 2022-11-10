const express = require("express");
const app = express();
const userRouter = require("./routes/userR");
const showsRouter = require("./routes/showR")
const db = require("./db/db");

app.use(express.json());

app.use("/user", userRouter);
app.use("/shows", showsRouter);

app.listen(5001, async () => {
  await db.sync();
});