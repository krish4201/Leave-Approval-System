const mongo = require("./DB")

const logindata=new mongo.Schema({
    email:String,
    pwd:String,
    role:String,

})
const logindatas=mongo.model("logindata",logindata)

module.exports=logindatas