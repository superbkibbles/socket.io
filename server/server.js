const port = process.env.PORT || 8080;
const socketIO = require("socket.io")
const http = require("http")
const express = require("express");
const path = require("path")

const {generateMessage, generateLocationMessage} = require("./utils/messages.js")
const publicPath = path.join(__dirname, "../public")
const app = express();
var server = http.createServer(app)
var io = socketIO(server)

// console.log(__dirname + "/../public");
// console.log(publicPath);

app.use(express.static(publicPath))

// app.get("/", (req, res)=>{
//   res.sendFile(publicPath + "/index.html")
// })

io.on("connection", (socket)=>{
  console.log("new user connected ")

  // socket.emit("newMessage", {
  //   from: "superkibbkes",
  //   text: "Hi, lets meet tomorrow",
  //   createdAt: new Date()
  // })

  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"))

  socket.broadcast.emit("newMessage", generateMessage("Admin", "new user joined"))

  socket.on("createdMessage", function(message, callback){
    console.log("messageCreated", message)
    io.emit("newMessage", generateMessage(message.from, message.text))
    callback("this is from the server")
  })

  socket.on("createLocationMessage", function(coords){
    console.log(coords.latitude, coords.longitude)
    io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude))
  })

  socket.on("disconnect", ()=>{
    console.log("client disconnected")
  })
})



server.listen(port, function(){
  console.log("app is on", port)
})
