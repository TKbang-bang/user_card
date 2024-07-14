const express = require("express");
const cors = require("cors");
const router = require("./configs/router");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "../images/")));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(app.get("port"), () =>
  console.log("server on port " + app.get("port"))
);
