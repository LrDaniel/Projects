const express = require("express");

const path = require("path");

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`listen on port  ${process.env.PORT}`);
});

app.use("/", express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
