const express=require('express')
const{validationResult}=require('express-validator')
const productsRepo=require('../../repositories/product')
const productsNewTemplate=require("../../views/admin/product/new")
const {requireTitle,requirePrice}=require("./validator")
const router=express.Router();
router.get("/admin/products",(req,res)=>{


})
router.get("/admin/products/new",(req,res)=>{
res.send(productsNewTemplate({}))

})
router.post("/admin/products/new",[requireTitle,requirePrice],(req,res)=>{
   const errors=validationResult(req)
   console.log(req.body);
   
    res.send("Success")

})
// router.get("/admin/product",(req,res)=>{


// })
// router.get("/admin/product",(req,res)=>{


// })
module.exports=router;