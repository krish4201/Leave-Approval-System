const mongo = require("./DB")

const userdetail=new mongo.Schema({
    name:String,
    role:String,
    email:String,
    dept:String,
    address1:String,
    address2:String,
    address3:String,
    Phd:String,
    phduniversity:String,
    phdpoyear:String,
    masters:String,
    mastersuniversity:String,
    masterspoyear:String,
    bachelors:String,
    bachelorsuniversity:String,
    bachelorspoyear:String,
    doj:String

})
const userdetails=mongo.model("userdetails",userdetail)

module.exports=userdetails