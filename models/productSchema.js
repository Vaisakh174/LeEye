const mongoose = require("mongoose");
const schema = mongoose.Schema;

const new_Product = new schema({
  
    name: { type: String, requied: true },
    discription: { type: String, requied: true },
    mrp: { type: Number, requied: true },
    discount: { type: Number, requied: true },
    shippingCharge: { type: Number, requied: true },
    date:{type:Date,default:Date.now()}

});
let DATA = mongoose.model("new_Product", new_Product);
module.exports =DATA;