const express = require('express'); // npm i express
const cookieParser = require('cookie-parser'); // npm i cookie-parser
const cors = require('cors');


// Routes

const authRoutes = require('./routes/auth.route');
const messageRoutes=require('./routes/message.route')
const app = express();


   // 
// 🔹 Middleware
app.use(cors({
  origin: "https://chatapp-1frontend.onrender.com", // frontend URL//
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// 🔹 Optional: attach io in controllers
// ye server.js me already handle ho raha hai, yaha sirf placeholder hai
app.use((req, res, next) => {
  // req.io will be injected from server.js
  next();
});

// 🔹 Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/api/auth', authRoutes);
app.use('/api/message',messageRoutes)


module.exports = app;