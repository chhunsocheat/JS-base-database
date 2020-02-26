const {check}=require('express-validator')
const userRepo=require("../../user")

module.exports={
    requireEmail:
    check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .custom(async (email)=>{
      const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
      throw new Error("Email already used")
    }
    }),
    check("password")
    .trim()
    .isLength({min:5,max:20}),
    check("passwordConfirmation")
    .trim()
    .isLength({min:5,max:20})
    .custom((passwordConfirmation,{req})=>{
      if(passwordConfirmation!=req.body.password){
        throw new Error("Password did not match")
      }
    }),
  
}