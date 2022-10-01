const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const todoRouter = require('./router/todos')

const app = express();
const port = process.env.PORT || 8080;

// To establish a MongoDB connection
connectDB()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(todoRouter);

app.get('/', (req,res) => {
    res.json('Testing the express functionality')
})


app.listen(port, () => {
    console.log(`The server is running at PORT ${port}`)
});

