//  Start the Server
require('dotenv').config();
console.log("Mongo URI:", process.env.MONGODB_URI);  // Debug line
const app = require('./src/app');
const connectDB = require('./src/db/db');


connectDB();

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});

