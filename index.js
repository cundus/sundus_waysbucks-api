require("dotenv").config();
const express = require("express");
const cors = require("cors");
const route = require("./src/routes/routes");
port = 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", route);

app.listen(port, () => {
  console.log(`sudah tersambung ke ${port}`);
});
