const express = require("express");
const app = express();
const userRouter = require("./routes/userR");
// const showsRouter = require("./routes/showR")
const db = require("./db/db");

app.use(express.json());

app.use("/users", userRouter);
// app.use("/shows", showsRouter);

app.listen(3000, async () => {
    console.log("Listening on port 3000");
});