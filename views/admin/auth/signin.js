const layout = require ("../layout")

const getError=(errors,props)=>{
  try{

    return errors.mapped()[props].msg;
    //return errors object
  }catch(err){
    return " ";
  }
}

module.exports=({errors})=>{
    return layout({
    content:`<div>
      <form method="POST">
      <input name="email" placeholder="email" />
      ${getError(error,"email")}
        <input name="password" placeholder="password" />
        ${getError(error,"password")}

        <button>Sign In</button>
      </form>
    </div>
  `})
}