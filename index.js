const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter=require('./routes/admin/auth')
const productRouter=require('./routes/admin/product')
const cartsRouter=require('./routes/carts')
const userProductRouter=require('./routes/products')
const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['lkasld235j']
  })
);
app.use(authRouter);
app.use(productRouter);
app.use(userProductRouter);
app.use(cartsRouter)



app.listen(3000, () => {
  console.log('Listening');
});
