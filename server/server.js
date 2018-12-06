const port = process.env.PORT || 8080;
const path = require("path")
const publicPath = path.join(__dirname, "../public")
const express = require("express");
const app = express()

console.log(__dirname + "/../public");
console.log(publicPath);

app.use(express.static(publicPath))

// app.get("/", (req, res)=>{
//   res.sendFile(publicPath + "/index.html")
// })



app.listen(port, function(){
  console.log("app is on", port)
})
