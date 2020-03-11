const express=require('express')
const{validationResult}=require('express-validator')
const multer=require("multer");


const productsRepo=require('../../repositories/product')
const productsNewTemplate=require("../../views/admin/product/new")
const {requireTitle,requirePrice}=require("./validator")
const router=express.Router();
const upload=multer({
    storage:multer.memoryStorage()
})
router.get("/admin/products",(req,res)=>{


})
router.get("/admin/products/new",(req,res)=>{
res.send(productsNewTemplate({}))

})
router.post("/admin/products/new",[requireTitle,requirePrice],upload.single('image'),(req,res)=>{
   const errors=validationResult(req)
   console.log(req.file);
   
    res.send("Success")

})
// router.get("/admin/product",(req,res)=>{


// })
// router.get("/admin/product",(req,res)=>{


// })
module.exports=router;