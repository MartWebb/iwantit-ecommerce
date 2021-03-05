import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import isAdmin from '../utils/isAdmin.js';
import isAuth from '../utils/isAuth.js';
const router  = new express.Router();

// @desc   Featch all products
// @route  GET /api/products
// @access Public
router.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    
    res.send(products);
}));

// @desc   Featch single product
// @route  GET /api/products/:id
// @access Public
router.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }

}));

// @desc   Create a product
// @route  POST /api/products
// @access Private/Admin
router.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample name ' + Date.now(),
        image: '/images/sample.jpg',
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

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Private/Admin
router.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const { 
        name, 
        price, 
        image, 
        countInStock, 
        category, 
        brand, 
        description 
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price; 
        product.image = image; 
        product.countInStock = countInStock;
        product.category = category;
        product.brand = brand;
        product.description = description; 

        const updatedProduct = await product.save();
        res.send({ message: "Product Updated", product: updatedProduct });
    } else {
        res.status(404).send({ message: "Product Not Found!" })
    }
}));

router.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        const deletedProduct = await product.remove();
        res.send({ meassage: "Product Removed!", product: deletedProduct });
    } else {
        res.status(404).send({ message: "Product Not Found"});
    }
}));

export default router;