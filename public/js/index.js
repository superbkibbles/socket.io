var socket = io()

function scrollToBottom(){
	var messages = $("#messages");
	var newMessage = messages.children("li:last-child");

	var clientHeight = messages.prop("clientHeight");
	var scrollTop = messages.prop("scrollTop");
	var scrollHeight = messages.prop("scrollHeight");
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight()

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ){
		return messages.scrollTop(scrollHeight)
	}
}

socket.on("connect", function () {
	console.log("connected to server");
})

socket.on("disconnect", function () {
	console.log("disconnected from the server")
})


socket.on("newMessage", function(message){

	console.log("newMessage", message)

	var formattedTime = moment(message.createdAt).format("h:mm a")
	var template = $("#message-template").html();
	var html = Mustache.render(template, {
		text: message.text,
		createdAt : formattedTime,
		from: message.from
	})

	$("#messages").append(html)

	scrollToBottom();

	/*var li = $("<li></li>")

	li.text(`${message.from} ${formattedTime}: ${message.text}`)
	$("#messages").append(li)*/
})

socket.on("newLocationMessage", function(message){
	console.log(message.url)
	var formattedTime = moment(message.createdAt).format("h:mm a")

	var template = $("#location-message-template").html()
	var html = Mustache.render(template, {
		from: message.from,
		createdAt: formattedTime,
		url: message.url
	})

	$("#messages").append(html)

	scrollToBottom()

	/*var li = $("<li></li>")
	var a = $(`<a target="_blank">my current location</a>`)

	li.text(`${message.from} ${formattedTime} :`)
	a.attr("href", message.url)
	li.append(a)
	$("#messages").append(li) */
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
