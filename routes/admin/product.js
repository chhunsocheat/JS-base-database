const express=require('express')
const{validationResult}=require('express-validator')
const multer=require("multer");
const {handleErrors,signInValidation}=require("./middleware")
const productTemplate=require("../../views/admin/product/index")
const productsRepo=require('../../repositories/product')
const productsNewTemplate=require("../../views/admin/product/new")
const productsEditTemplate=require("../../views/admin/product/edit")
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
router.get("/admin/products/:id/edit",async (req,res)=>{
console.log(req.params.id);
const product=await productsRepo.getOne(req.params.id)
if(!product){
    return res.send("Product not found")
}
res.send(productsEditTemplate({product}))
})


router.post("/admin/products/:id/edit",
signInValidation,
upload.single('image'),
[requireTitle,requirePrice],
handleErrors(productsEditTemplate,async(req)=>{
    const product = await productsRepo.getOne(req.params.id);
    return {product};
}),
async (req,res)=>{
const changes =req.body;
if(req.file){
    changes.image=req.file.buffer.toString("base64")
}
try{
    
    await productsRepo.update(req.params.id,changes)
}catch(err){
    return res.send("could not send item")
}
res.redirect("/admin/products")
})
router.post("/admin/products/:id/delete",signInValidation,async (req,res)=>{
productsRepo.delete(req.params.id);
res.redirect("/admin/products")
})
module.exports=router;