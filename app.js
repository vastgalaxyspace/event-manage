require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const event=require('./router/event.router');
const user=require('./router/user.router');

connectDB();
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/event',event);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    try {
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});