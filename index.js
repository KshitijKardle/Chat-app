import {Server} from "socket.io"
import { createServer } from "http";
const httpServer = createServer();
const io = new Server(httpServer,{
    cors: {
        origin: "http://127.0.0.1:5500",
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});
httpServer.listen(3000);
const user = {}

io.on("connection",socket=>{
    socket.on("newUserJoin", name=>{
        user[socket.id] = name
        socket.broadcast.emit("user-join-event", name)
    })    

    socket.on("sendMessage", message=>{
        socket.broadcast.emit("recieve", {message:message, name:user[socket.id]})
    })

    socket.on("disconnect", message=>{
        socket.broadcast.emit("leave", user[socket.id])
        delete user[socket.id]
    })

})