const mongo = require("./DB")
const status=new mongo.Schema({
    email:String,
    status:String
})
const leavestatus=mongo.model("leavestatus",status)

module.exports=leavestatus