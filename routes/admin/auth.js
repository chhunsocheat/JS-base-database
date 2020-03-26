const usersRepo = require('../../repositories/user.js');
const express=require('express')
const {check,validationResult}=require('express-validator')

const signupTemplate = require('../../views/admin/auth/signup')
const signinTemplate = require('../../views/admin/auth/signin')
const router=express.Router();
const {requireEmail,requirePassword,requireConfirmation,
  requirePasswordSignIn,requireEmailSignIn}=require('./validator')

router.get('/signup', (req, res) => {
    res.send(signupTemplate({req}));
  });
  
  router.post('/signup',[requireEmail,requirePassword], async (req, res) => {
    const errors=validationResult(req)
    console.log(errors);
    if(!errors.isEmpty()){
      return res.send(signupTemplate({req,errors}))
    }
    const { email, password, passwordConfirmation } = req.body;
  
    // Create a user in our user repo to represent this person
    const user = await usersRepo.create({ email, password });
  
    // Store the id of that user inside the users cookie
    req.session.userId = user.id;
  
    res.redirect("/admin/products");
  });
  
  router.get('/signout', (req, res) => {
    req.session = null;
    res.send(`<h1 class='title'>You are sign out</h1>`); 
  });
  
  router.get('/signin', (req, res) => {
   return res.send(signinTemplate({}));
  });
  
  router.post('/signin',[
    requirePasswordSignIn,requireEmailSignIn
  ], async (req, res) => {
    
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.send(signinTemplate({errors}));
    }
    
    const { email } = req.body;
  const user = await usersRepo.getOneBy({email})
  if(user===undefined){
  return res.send('User not found');

  }
    req.session.userId = user.id;
    res.redirect("/admin/products");
  });



  module.exports=router;


