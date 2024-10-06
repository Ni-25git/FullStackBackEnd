const express = require('express');
const ProductModel = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');
const checkAcessRole = require('../middleware/checkAccessRole');
const product = express.Router();

product.get('/' , async (req,res)=>{
    try {
        const products = await ProductModel.find().populate({path:'userID' , select:'username' });
        if(!products){
            return res.status(401).json({msg:'Products not found'})
        }

        res.status(201).json(products)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }

});

product.post("/" , authMiddleware, checkAcessRole('admin'), async (req,res)=>{
    try {
        const {name , category , brand , price , stock} = req.body;
        const userID = req.user.id;
        if(!userID){
            return res.status(401).json({msg:'UserId not found'})
        }
        const product = new ProductModel({name , category , brand , price , stock , userID});
        console.log(userID)
        await product.save();
        
        res.status(201).json({msg:'Product added successfully',product})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

product.put('/:productId' , authMiddleware , checkAcessRole('admin'), async (req,res)=>{
    try {
        const {productId} = req.params;
        const {name , category , brand , price , stock} = req.body;
        const userID = req.user.id
        

        const product = await ProductModel.findById(productId);
        if(!product){
            return res.status(401).json({msg:'Product not found'})
        };

    

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId,{name , category , brand , price , stock , userID });
        await updatedProduct.save();
        
        res.status(201).json({msg:'Product updated successfully',updatedProduct})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});


product.delete('/:productId' , authMiddleware , checkAcessRole('admin'), async (req,res)=>{
    try {
        const {productId} = req.params;
        

        const product = await ProductModel.findById(productId);
        if(!product){
            return res.status(401).json({msg:'Product not found'})
        };

    

        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        
        res.status(201).json({msg:'Product deleted successfully',deletedProduct})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});






module.exports = product;