const layout=require('../layout')
const helpers=require('../../helpers')
getError=(errors,props)=>{
    try{
  
      return errors.mapped()[props].msg;
      //return errors object
    }catch(err){
      return " ";
    }
  }
module.exports=({errors})=>{
    return layout({
        content:
        `
        <form method="POST" enctype="multipart/form-data">
        <input placeholder="Title" name="title" />
        ${getError(errors,'title')}
        <input placeholder="Price" name="price" /> 
        ${getError(errors,'price')}
        <input type="file" name="image" />
        <button>Submit</button>
        </form>
      
        `
    })
}