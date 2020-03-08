const {check}=require('express-validator')
const usersRepo=require("../../repositories/user")

module.exports={
  requireTitle:check('title')
  .trim()
  .isLength({min:5,max:40}),
  requirePrice:check('price')
  .trim()
  .toFloat()
  .isFloat({min:1})
  ,requireEmail:
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
    requirePassword: check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters'),
  requirePasswordConfirmation: check('passwordConfirmation')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters')
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error('Passwords must match');
      }
    }),
  requireEmailSignIn:
  check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a email")
    .custom(async(email)=>{
      const user= await usersRepo.getOneBy({email})
      if(!user){
        throw new Error("Email not found")
      }
    }),
    requirePasswordSignIn:
    check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error('Invalid password upper');
      }

      const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
      );
      console.log(user.password);
      console.log(password);
      console.log(validPassword);
      
      if (!validPassword) {
        throw new Error('Invalid passworddd');
      }
    })

}