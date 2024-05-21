const Product = require("../models/productmodel");
const errorHander = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
//get product  - /api/v1/products
exports.getProducts = async(req,res,next) =>{
  const allProducts =  await Product.find()
res.status(200).json({
    suscess:true,
    count:allProducts.length,
    products:allProducts
});
}
//new product - /api/v1/products/new
exports.newProduct = catchAsyncError( async(req,res,next) => {
  const product = await Product.create(req.body)
    res.status(201).json({
        suscess:true,
        product:product
    })
})

//get new product -/api/v1/products/:id
exports.getSingleProduct = async (req, res, next) => {
    try {
        console.log('Product ID:', req.params.id);
        const product = await Product.findById(req.params.id)

        if (!product) {
            return next(new errorHander("Product not found", 404));
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.log(error.message);
    }
};

//update product - /api/v1/products/:id --put
exports.updateProduct = async (req,res,next)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    if (!product) {
        return next(new errorHander("Product not found", 404));
    }
    
    res.status(200).json({
        success:true,
        product
    })
}

//delete product - api/v1/products:id --delete
exports.deleteProduct = async(req,res,next) =>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new errorHander("Product not found", 404));
    }
    await Product.deleteOne({ _id: req.params.id })
    res.status(200).json({
        success:true,
        message:"object deleted sucessfully"
    })
}