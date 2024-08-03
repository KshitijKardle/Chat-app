const socket = io("http://localhost:3000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

let form = document.getElementById("send-message")
let btn = document.getElementById("send-button")
let inputMessage = document.getElementById("input-message")
let messageContainer = document.querySelector(".container")


let username = prompt("Enter your name")

form.addEventListener("submit", (event)=>{
  event.preventDefault();
  const message = inputMessage.value
  addMessage(`You:${message}`, "right")
  socket.emit('sendMessage',message)
  inputMessage.value = ''
})

const addMessage = (message,position,color) => {
  const newMessage = document.createElement("div")
  newMessage.innerText = message
  newMessage.classList.add("message")
  newMessage.classList.add(position)
  newMessage.style.color = color
  messageContainer.append(newMessage)
}

socket.emit("newUserJoin", username)

socket.on("user-join-event", name=>{
  addMessage(`${name} joined chat`, "right","greenyellow")

})

socket.on("recieve", data=>{
  addMessage(`${data.name}: ${data.message}`, "left", "white")
})

socket.on("leave", name=>{
  addMessage(`${name} left the chat`, "left", "red")
})

