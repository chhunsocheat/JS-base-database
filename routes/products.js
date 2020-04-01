const express=require('express')
const router=express.Router();
const productRepo=require("../repositories/product")
const productTemplate=require("../views/products/index")

router.get("/",async(req,res)=>{
const products= await productRepo.getAll();
res.send(productTemplate({products}))
})





module.exports=router;