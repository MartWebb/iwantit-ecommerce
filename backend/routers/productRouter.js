import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'
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

export default router;