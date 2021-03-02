import express from 'express';
// import products from './data/products.js';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/config/paypal', (req, res ) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/', (req, res) => {
    res.send('Server Ready');
});

// app.get('/api/products', (req, res) => {
//     res.send(products);
// });

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find((item) => item._id === req.params.id);

//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ message: 'Product not Found'});
//     }
// });

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`);
});