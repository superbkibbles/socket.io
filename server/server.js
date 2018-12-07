const port = process.env.PORT || 8080;
const socketIO = require("socket.io")
const http = require("http")
const express = require("express");
const path = require("path")

const publicPath = path.join(__dirname, "../public")
const app = express();
var server = http.createServer(app)
var io = socketIO(server)

console.log(__dirname + "/../public");
console.log(publicPath);

app.use(express.static(publicPath))

// app.get("/", (req, res)=>{
//   res.sendFile(publicPath + "/index.html")
// })

io.on("connection", (socket)=>{
  console.log("new user connected ")

  socket.on("disconnect", ()=>[
    console.log("client disconnected")
  ])
})



server.listen(port, function(){
  console.log("app is on", port)
})
