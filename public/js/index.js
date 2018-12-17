var socket = io()

socket.on("connect", function () {
  console.log("connected to server");
})

socket.on("disconnect", function () {
  console.log("disconnected from the server")
})


socket.on("newMessage", function(message){
  console.log("newMessage", message)
  var li = $("<li></li>")
  li.text(`${message.from} : ${message.text}`)
  $("#messages").append(li)
})

socket.on("newLocationMessage", function(message){
  console.log(message.url)

  var li = $("<li></li>")
  var a = $("<a target='_blank'>my current location</a>")

  li.text(`${message.from} :`)
  a.attr("href", message.url)
  li.append(a)
  $("#messages").append(li)
})

//jquery
$("#message-form").on("submit", function(e){
	e.preventDefault()
	var messageTextBox = $("[name=message]")
	
	socket.emit("createdMessage", {
		from: "user",
		text: messageTextBox.val()
	}, function(){
		messageTextBox.val("")
	})
})

//getting lcoation
var locationBtn = $("#geolocationBtn")
locationBtn.on("click", function(e){
	e.preventDefault();
	

	if(!navigator.geolocation){
		return alert("geolocatin is not available")
	}
	locationBtn.attr("disabled", "disabled").text("sending location ...");
	
	setTimeout(function(){
		navigator.geolocation.getCurrentPosition(function(pos){
		// console.log(pos)
		locationBtn.removeAttr("disabled").text("send location!")
		socket.emit("createLocationMessage", {
			latitude: pos.coords.latitude,
			longitude: pos.coords.longitude
		})
		}, function(){
			locationBtn.removeBtn("disabled").text("send location!")
			alert("unable to fetch location")
		})	
	},500)

})









