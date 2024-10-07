const express = require('express');
const connectDb = require('./config/db');
const user = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const product = require('./routes/productRoutes');
require('dotenv').config();
const app = express();
const cors = require('cors');
const PORT = process.env.PORT
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use('/api/auth' , user)
app.use('/api/products' , product)

app.get("/privateData" , authMiddleware ,(req,res)=>{
    res.send('Private Date')
})




app.listen(PORT , async ()=>{
    try {
        await connectDb()
        console.log(`server is listening on PORT ${PORT}`)
    } catch (error) {
        console.log('error in connecting db')
    }
})