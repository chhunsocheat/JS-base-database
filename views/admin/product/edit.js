const layout=require('../layout')
getError=(errors,props)=>{
    try{
  
      return errors.mapped()[props].msg;
      //return errors object
    }catch(err){
      return " ";
    }
  }
module.exports=({product,errors})=>{
    return layout({content:`
    <form method="POST">
    <input name="title" value="${product.title}"/>
    ${getError(errors,"title")}
    <input name="price" value="${product.price}"/>
    ${getError(errors,"price")}
    <input name="image" type="file" value="${product.image}"/>
    <button>Submit</button>
    </form>
    `
    })
}
