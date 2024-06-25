const mongo = require("./DB")
const history=new mongo.Schema({
    email:String,
    dept:String,
    reason:String,
    applieddate:String,
    leavetype:String,
    startdate:String,
    enddate:String,
    status:String
})
const historydata=mongo.model("historydata",history)

module.exports=historydata