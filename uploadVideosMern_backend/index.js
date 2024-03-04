const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const mediaRoutes = require("./routes/media");
const userRoutes = require("./routes/User.routes");
const mediasRoutes = require("./routes/Video.routes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/medias", mediasRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

const mongodbUri =
  "mongodb+srv://mamtazfreelancer:f7FcczeDomuZ5F3L@cluster0.6ds5s8q.mongodb.net/uploadproject";

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb...");
});
mongoose.set("strictQuery", false);

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

app.listen(8000, () => {
  console.log("App is running on PORT 8000");
});
