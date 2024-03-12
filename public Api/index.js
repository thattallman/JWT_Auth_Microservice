const express = require("express");
const path = require('path')
const app = express();

app.set("view engine", "ejs");
const { PORT, MONGO_URL } = require("./config/config");
const { connectToMongoDB } = require("./connections");
const publicApiRouter = require("./routes/publicApi");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connectToMongoDB(MONGO_URL);
app.use("/api/public", publicApiRouter);
app.use((req, res, next) => {
    res.status(404).render("notFound");
  });
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
