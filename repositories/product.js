const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository=require('./repository')

class Product extends Repository{

}

module.exports=new Product('products.json')