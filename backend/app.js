require("dotenv").config();
const express = require("express");
// const cors = require("cors");

const app = express();
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routers"));

app.listen(process.env.PORT || 4100, (req, res) => {
  console.log(`Server is running 🚀 on ${process.env.PORT}`);
});
