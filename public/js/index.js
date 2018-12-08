var socket = io()

socket.on("connect", function () {
  console.log("connected to server");

  socket.emit("createdMessage", {
    from : "Ali",
    text: "Yah, lets do it!"
  })
})

socket.on("disconnect", function () {
  console.log("disconnected from the server")
})


socket.on("newMessage", function(message){
  console.log("newMessage", message)
})
