if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(router);

// app.listen(PORT, () => {
//   console.log(`Example app listening on PORT ${PORT}`);
// });

module.exports = app;
