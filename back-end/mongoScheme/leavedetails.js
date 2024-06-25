const mongo = require("./DB")
const allleavedata=new mongo.Schema({
    hod:[{
        email:String,
        dept:String,
        reason:String,
        leavetype:String,
        startdate:String,
        enddate:String,
        status:String,
        applieddate:String
    }],
    dean:[{
        email:String,
        dept:String,
        reason:String,
        leavetype:String,
        startdate:String,
        status:String,
        applieddate:String,
        enddate:String}]
})
const leavedatas=mongo.model("leavedatas",allleavedata)

module.exports=leavedatas