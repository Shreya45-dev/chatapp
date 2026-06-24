

/*require('dotenv').config()

const app=require('./src/app')
const connectDB=require('./src/db/db')
const { server } = require('./src/socket/socket.js')
connectDB()
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))*/
require("dotenv").config();

const http = require("http");
const app=require('./src/app')
const connectDB=require('./src/db/db')
const { initSocket } = require('./src/socket/socket.js')
const server = http.createServer(app);

// socket attach
initSocket(server);

const PORT = process.env.PORT || 3000;

connectDB();

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});