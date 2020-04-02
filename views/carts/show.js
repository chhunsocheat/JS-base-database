const layout = require('../products/layout');

module.exports = ({ items }) => {
    const totalPrice=items.reduce((acc,item)=>{
         return acc+item.product.price*item.quantity;
    },0)
  const renderedItems = items
    .map(item => {
      return `
        <div class="cart-item message">
          <h3 class="subtitle">${item.product.title}</h3>
          <div class="cart-right">
            <div>
              $${item.product.price}  X  ${item.quantity} = 
            </div>
            <div class="price is-size-4">
              $${item.product.price * item.quantity}
            </div>
            <div class="remove">
              <form method="POST" action="/cart/products/delete">
              <input hidden name="itemId" value=${item.id} />
                <button class="button is-danger">                  
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return layout({
    content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems} 
            </div>
            <div class="total message is-info">
              <div class="message-header">
                Total
              </div>
              <h1 style="text-align:center;" class="title">$${totalPrice}</h1>
             
             
              <button action="carts/delete" class="button is-primary">Buy</button>
          
              </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    `
  });
};
