const express = require("express");
const dbConnect = require("./dbConnect");
const routes = require("./routes/routes");

dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(5000, () => {
  console.log("Server is up running on 5000");
});
