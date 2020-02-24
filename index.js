const express = require('express');
const bodyParser = require('body-parser');
const userRepo = require('./user')
const cookieSession= require('cookie-session')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  keys:['asdasddfbrghherbdf']
}))
app.get('/signup', (req, res) => {
  res.send(`
    <div>
     Your Id  ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post('/signup', async (req, res) => {
const{email,password,passwordConfirmation}=req.body; 
const existingUser=await userRepo.getOneBy({email})
if(existingUser){
 return res.send("User already Exist")
}
if(password!=passwordConfirmation){
  return res.send("Password did not match")
}
const user=  await userRepo.create({
  email,password
})

req.session.userId= user.id;

res.send("Account created")

  
});

app.get('/signout',(req,res)=>{
  req.session=null;
  req.send("You are logged out")
})

app.get("/signin",(req,res)=>{
  res.send(`
  <div>
   <form method="POST">
     <input name="email" placeholder="email" />
     <input name="password" placeholder="password" />
     <button>Sign In</button>
   </form>
 </div>
  `)
})

app.listen(3000, () => {
  console.log('Listening');
});
