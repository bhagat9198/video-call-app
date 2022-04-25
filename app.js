const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const ShortUniqueId = require('short-unique-id');
const { join } = require('path');

const meetings = require('./meeting').meetings;

const app = express();
app.use(cors());
const server = require('http').createServer(app);;
const uid = new ShortUniqueId();

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

const PORT = process.env.PORT || 5000;

// console.log('meetings :: ', meetings)
// console.log('uid :: ', uid(5))
io.on('connection', socket => {
  console.log('Connected :: client :: ', socket.id)


  socket.on('new-room', data => {
    console.log('socket :: new-room :: data :: ', data);
    const roomId = uid(5);
    const roomData = {
      host: data.name,
      peerId: socket.id,
      roomId: roomId,
      createdAt: new Date().getTime(),
    }
    meetings.push({
      ...roomData,
      peers: []
    })
    socket.join(roomId)
    socket.emit('room-created', roomData)
  })


  socket.on('join-room', data => {
    console.log('join-room :: data :: ', data);
    if (!data.roomId) {
      socket.emit('error', { message: 'roomId missing, unable to join the session' })
    }

    // const isRoomPresent = meetings.filter(meet => meet.roomId == data.roomId);
    // if (isRoomPresent.length == 0) {
    //   socket.emit('error', { message: 'Invalid roomId' })
    // }
    // let roomInfo = isRoomPresent[0];
    console.log('join-room :: meetings :: ', meetings);

    const roomIndex = -1;
    let roomInfo;
    for (let i = 0; i < meetings.length; i++) {
      let meet = meetings[i];
      if (meet.roomId == data.roomId) {
        roomIndex = i;
        roomInfo = meet;
        meet.peers.push({
          peerId: socket.id,
          name: data.name,
          joinedAt: new Date()
        })
        break;
      }
    }
    if (roomIndex == -1) {
      socket.emit('error', { message: 'Invalid roomId' })
    }
    socket.join(data.roomId);
    socket.emit('room-joined', { roomInfo: roomInfo, peerId: socket.id });
  })

  // socket.emit("me", socket.id)

  // socket.on("disconnect", () => {
  // 	socket.broadcast.emit("callEnded")
  // })

  // socket.on("callUser", (data) => {
  // 	io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
  // })

  // socket.on("answerCall", (data) => {
  // 	io.to(data.to).emit("callAccepted", data.signal)
  // })

})

server.listen(PORT, (err, success) => {
  // console.log('Connection listen :: err :: ', err);
  // console.log('Connection listen :: success :: ', success);
  console.log('Connected on PORT :: ', PORT);
})