import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import isAdmin from '../utils/isAdmin.js';
import isAuth from '../utils/isAuth.js';
const router  = new express.Router();

router.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    
    res.send(products);
}));

router.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }

}));

router.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample name ' + Date.now(),
        image: '/images/p1.jpg',
        price: 0,
        user: req.user._id,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description'
    });
    const createdProduct = await product.save();
    res.status(201).send({ message: 'Product Created', product: createdProduct });

}));

export default router;