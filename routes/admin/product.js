const express=require('express')
const{validationResult}=require('express-validator')
const multer=require("multer");
const {handleErrors,signInValidation}=require("./middleware")
const productTemplate=require("../../views/admin/product/index")
const productsRepo=require('../../repositories/product')
const productsNewTemplate=require("../../views/admin/product/new")
const {requireTitle,requirePrice}=require("./validator")
const router=express.Router();
const upload=multer({
    storage:multer.memoryStorage()
})
router.get("/admin/products",signInValidation,async (req,res)=>{
    
const products = await productsRepo.getAll();
res.send(productTemplate({products})); 
})
router.get("/admin/products/new",signInValidation,(req,res)=>{
res.send(productsNewTemplate({}))

})
router.post("/admin/products/new"
,signInValidation
,upload.single('image')
,[requireTitle,requirePrice]
,handleErrors(productsNewTemplate)
,async (req,res)=>{
 

      
     const image=req.file.buffer.toString("base64");
     if(req.file.buffer===undefined){
         return res.send(productsNewTemplate({}))
     }
     const {title,price}=req.body;
     await productsRepo.create({
      title,price,image
     })
      res.redirect("/admin/products");
  
})
// router.get("/admin/product",(req,res)=>{


// })
// router.get("/admin/product",(req,res)=>{


// })
module.exports=router;