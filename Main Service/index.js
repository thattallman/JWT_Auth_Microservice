const express = require("express");
const app = express();
// Setting the view engine to EJS
app.set("view engine", "ejs");
var cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connections");
const { handleJWTToken } = require("./Middlewares/auth");
const { PORT, MONGO_URL } = require("./config/config");
const { verifyPublicApiKey } = require("./Middlewares/publicApiAuth");
app.use(cookieParser());

connectToMongoDB(MONGO_URL);
const userRouter = require("./routes/userApi");
const candidateRouter = require("./routes/condidateApi");
const publicApiRouter = require("./routes/publicApi");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", userRouter);

app.use("/api/candidate", handleJWTToken, candidateRouter);

app.use("/api/public", verifyPublicApiKey, publicApiRouter);

app.use((req, res, next) => {
    res.status(404).render("notFound");
  });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
