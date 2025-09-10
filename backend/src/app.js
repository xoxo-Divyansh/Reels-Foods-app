// Create a Server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res)=> {
   res.send("hellow World");
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

module.exports = app;
