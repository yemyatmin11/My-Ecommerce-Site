const express = require('express');
const morgan = require('morgan');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');
const cartRoutes = require('./routes/carts');
const orderRoutes = require('./routes/orders');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AuthMiddleware = require('./middleware/AuthMiddleware');
require('dotenv').config();

const app = express();
app.use(express.static('public'));

const mongoUrl = 'mongodb+srv://yemyatmin:test1234@e-commerce.ywdmkva.mongodb.net/?retryWrites=true&w=majority&appName=E-commerce';

mongoose.connect(mongoUrl).then(() => {
    console.log('connected to db');
    app.listen(process.env.PORT, 'localhost', () => {
        console.log('app is running in localhost:'+process.env.PORT);
    })
})
    
// app.use(cors(
//     {
//         origin : "http://localhost:5173",
//         credentials : true
//     }
// )); // warning --

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin, like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false); // callback('Indicate error', request is disallowed)
        }
        else {
            return callback(null, true); // callback('Indicate no error', request is allowed)
        }
    },
    credentials: true
})); 

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/', (req,res) => {
    return res.json({hello : 'world'})
})

// app.use('/api/products/',AuthMiddleware,productRoutes); // this is main
app.use('/api/products/',productRoutes); // dr ka admin a twat san nay loh
app.use('/api/users',userRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/carts', AuthMiddleware,cartRoutes);
// app.use('/api/orders', AuthMiddleware,orderRoutes);
app.use('/api/orders',orderRoutes);

app.get('/set-cookie', (req,res) => {
    res.cookie('name','yemyatmin');
    res.cookie('important','value', {httpOnly : true});
    res.json({msg : 'cookie already set'})
})

app.get('/get-cookie', (req,res) => {
    let cookies = req.cookies;
    return res.json(cookies);
})