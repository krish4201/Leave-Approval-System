const express=require("express");
const app=express();
const dotenv=require('dotenv').config();
const cors =require("cors");
const bcrypt = require("bcryptjs");
const status = require("statuses");
const mongo = require("./mongoScheme/DB");
const userdetails = require("./mongoScheme/userdetails");
const logindatas = require("./mongoScheme/logindata");
const leavedatas = require("./mongoScheme/leavedetails");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const historydata = require("./mongoScheme/leavehistory");
const leavestatus = require("./mongoScheme/leavestatus");


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: process.env.MAIL_PORT,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// async function main() {
//   const info = await transporter.sendMail({
//     from: process.env.EMAIL, // sender address
//     to: "rkkramesh2001@gmail.com", // list of receivers
//     subject: "testing", // Subject line
//     text: "tested successfully", // plain text body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);


app.listen(process.env.PORT,()=>{
    console.log(`server runs in ${process.env.PORT}`)
})
app.use(cors())

app.use(express.json())


app.get("/",cors(),(req,res)=>{

})

//get all user
app.post("/getalluser",async (req,res)=>{
    try {
        const allusers = await userdetails.find()
    res.json(allusers)
    }catch{
        res.json("Error")
    }
})


//remove user
app.post("/remove", async (req, res) => {
    const { email } = req.body; // Extracting email from req.body
    try {
        const user = await userdetails.deleteOne({ email: email });
        const login = await logindatas.deleteOne({ email: email });
        if (user && login) {
            res.json("removed");
        } else {
            res.json("not removed");
        }
    } catch (error) {
        console.error("Error removing user:", error);
        res.status(500).json("Error occurred while removing user");
    }
});

//Login
app.post("/login",async (req,res)=>{
    const { email ,pwd }= req.body
    try{
        const finduser =await logindatas.findOne({email:email})
        const user=await userdetails.findOne({email:email})
        if(finduser.role=="hod" || finduser.role=="dean"){
            res.json(bcrypt.compare(pwd,finduser.pwd) ? ["admin",user]:["wrong",user])
        }
        else if(finduser.role=="faculty") {
            res.json(bcrypt.compare(pwd,finduser.pwd) ? ["user",user]:["wrong",user])
        }
        else{
            res.json("notexist")
        }
        
    }
    catch{
        res.json("notexist")
    }
})



//Creating USER from ADMIN
app.post("/create",async(req,res)=>{
    
    const user=req.body;
    
    
    try{
        const finduser = await logindatas.findOne({email : user.email})
        if(finduser){
            res.json("Email Already Exist!")
        }
        else{
            const test=await userdetails.create(user)
            const pwd=Math.floor(Math.random()*100000000);
            async function main() {
                const info = await transporter.sendMail({
                  from: process.env.EMAIL, // sender address
                  to: user.email, // list of receivers
                  subject: "Login Password", // Subject line
                  text: `Your Password for login to portal is ${pwd}`, // plain text body
                });
              
                console.log("Message sent: %s", info.messageId);
                // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
              }
              
            main().catch(console.error);
            const encryptpassword=await  bcrypt.hash(pwd.toString() , 10);
            const login= await logindatas.create({
                email:user.email,pwd:encryptpassword,role:user.role
            })
            if(test && login){
                res.json("Account Created")
            }
            else{
                res.json("Account not Created")
            }
        }
    }catch{
        res.json("Error while Creating")
    }
})


//Update USER from ADMIN
app.post("/update",async(req,res)=>{
    const details=req.body
    try{
        const finduser=await userdetails.find({email:details.email})
        if(finduser){
            // await userdetails.updateOne({email:details.email},user)
            const updates=await userdetails.updateOne(details)
            if(updates){
                res.json("Updated")
            }
            else{
                res.json("not Updated")
            }
        }
    }catch{
        res.json("Error While updation")
    }    
})

//apply leave
app.post("/applyleave", async (req, res) => {
    const userLeaveData = req.body;
    try {
        // Check if the collection is empty, if so, create initial document
        const all = await leavedatas.findOne();
        if (!all) {
            await leavedatas.create({ hod: [], dean: [] });
        }

        // Check if the leave application already exists
        const find = await leavedatas.findOne({
            "hod.email":userLeaveData.email,
            "hod.applieddate":userLeaveData.applieddate,
            "hod.startdate": userLeaveData.startdate,
            "hod.enddate": userLeaveData.enddate,
            "hod.dept": userLeaveData.dept,
        });
        
        if (!find) {
            // Insert the new leave data and update status
            const insert = await leavedatas.updateOne({}, { $push: { hod: userLeaveData } });
            await leavestatus.updateOne({ email: userLeaveData.email, status: "Applied" });

            if (insert) {
                res.json("applied");
            } else {
                res.json("Something is wrong");
            }
        } else {
            res.json("already exists");
        }
    } catch (error) {
        console.error("Error while applying for leave:", error);
        res.status(500).json("Error while applying for leave");
    }
});


//forward
app.post("/forward",async(req,res)=>{
    leavedatas["status"] = "Forward"
    const userLeaveData = req.body;
    try {
        // Check if the collection is empty, if so, create initial document
        const all = await leavedatas.findOne();
        const all2= await leavestatus.findOne();
        if (!all) {
            await leavedatas.create({ hod: [], dean: [] });
        }
        if (!all2) {
            await leavestatus.create({ email:"",status:"" });
        }
            // Insert the new leave data and update status
            const insert = await leavedatas.updateOne({}, { $push: { dean: userLeaveData } });
            await leavestatus.updateOne({ email: userLeaveData.email, status: "Forwarded" });
            await leavedatas.updateOne({}, { $pull: { hod: userLeaveData } });
            if (insert) {
                res.json("Forwarded");
            } else {
                res.json("Something is wrong");
            }
        }catch (error) {
        console.error("Error while applying for leave:", error);
        res.status(500).json("Error while applying for leave");
    }
})

//accept
app.post("/accept",async (req,res)=>{
    const accept = req.body
    // accept["s>tatus"]="Accepted"
    try{
        await leavedatas.deleteOne({"dean.email":accept.email});
        // await leavedatas.deleteOne({dean:accept})
        await leavestatus.updateOne({email:accept.email},{status:"Accepted"})
        await historydata.create(history);

        // Update historydata status
        await historydata.updateOne({ email: history.email, applieddata: history.applieddate }, { status: "Accepted" });
        // await historydata.updateOne({email:accept.email,applieddata:accept.applieddate},{status:"Accepted"})
        async function main() {
            const info = await transporter.sendMail({
              from: process.env.EMAIL, // sender address
              to: accept.email, // list of receivers
              subject: "Leave Application status", // Subject line
              text: `Your Leave application has been accepted`, // plain text body
            });
          
            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
          }
          
        main().catch(console.error);
        res.json(insert)
    }catch{
        res.json("Error")
    }
})

//decline
app.post("/decline", async (req, res) => {
    const history = req.body;
    // history.status = "decline";
    try {
        // Delete leave request based on hod or dean
        let leavedecline;
        if (history.hod) {
            leavedecline = await leavedatas.deleteOne({ "hod.email":history.email });
        } else if (history.dean) {
            leavedecline = await leavedatas.deleteOne({  "dean.email":history.email});
        }
        await leavedatas.deleteOne({  "dean.email":history.email});
        await leavedatas.deleteOne({ "hod.email":history.email });
        // Update leave status to "Declined"
        await leavestatus.updateOne({ email: history.email }, { status: "Declined" });

        // Create a history record
        await historydata.create(history);

        // Update historydata status
        await historydata.updateOne({ email: history.email, applieddata: history.applieddate }, { status: "Declined" });

        res.json(await leavedatas.find()); // Respond with declined history object
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while declining leave request." });
    }
});


//getleave
app.post("/getleaveforhod",async (req,res)=>{
    const data=req.body
    const test=await leavedatas.findOne()
    if(test){
        res.json(test.hod)}
        else{
            res.json([])
        }
}  )
app.post("/getleavefordean",async (req,res)=>{
    const data=req.body
    const test=await leavedatas.findOne()
    if(test){
        res.json(test.dean)}
        else{
            res.json([])
        }
}  )


//leavehistory
app.post("/leavehistory", async(req,res)=>{
    const history=await historydata.find()
    res.json(history)
} )

//manage
app.post("/manage", async (req, res) => {
    const { email } = req.body; // Extracting email from req.body
    try {
        const user = await userdetails.findOne({ email: email });
        const login = await logindatas.findOne({ email: email });
        res.json(user)
    } catch (error) {
        console.error("Error removing user:", error);
        res.status(500).json("Error occurred while removing user");
    }
});

//history
// app.post("/status", async (req, res) => {
//     try {
//         // Assuming the email is directly available in req.body.email
//         const email = req.body.email;
//         // Query the leavedatas collection where any hod email matches the provided email
//         const history = await leavedatas.find({ "hod.email": email });
//         const history1 = await leavedatas.find({ "dean.email": email });
//         const status = await leavestatus.find({ email: email });
//         if(history){
//             res.json([{status:"hod",data:await leavedatas.find({ "hod.email": email })}]);
//         }
//         else if (history1) {
//             res.json([{status:"dean",data:await leavedatas.find({ "dean.email": email })}]);
//         }
//         else{
//             res.json([{status:"status",data:await leavestatus.find({ email: email })}])
//         }
//         // Send the found history as JSON response

//     } catch (error) {
//         // Handle errors, for example, send an error response
//         res.status(500).json({ error: error.message });
//     }
// });

app.post("/status", async (req,res)=>{
    const { email } = req.body
    const data=await leavestatus.find({email:email})
    res.json(data)
})



/////////////////////////

app.get("/leaveschedules", async (req, res) => {
    try {
      const leaveSchedules = await historydata.find({email : req.body});
      res.json(leaveSchedules);
    } catch (error) {
      console.error("Error fetching leave schedules:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Endpoint to create a new leave schedule
  app.post("/leaveschedules", async (req, res) => {
    const { email } = req.body;
    try {
        const {startdate,enddate}= await historydata.find({email:email})
    //   const newLeaveSchedule = new historydata({ email, startdate, enddate });
    //   await newLeaveSchedule.save();
      res.json({});
    } catch (error) {
      console.error("Error creating leave schedule:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Endpoint to update an existing leave schedule
  app.put("/leaveschedules/:id", async (req, res) => {
    const { id } = req.params;
    const { email, start, end } = req.body;
    try {
      const updatedLeaveSchedule = await historydata.findByIdAndUpdate(
        id,
        { email, start, end },
        { new: true }
      );
      res.json(updatedLeaveSchedule);
    } catch (error) {
      console.error("Error updating leave schedule:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Endpoint to delete a leave schedule
  app.delete("/leave-schedules/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await LeaveSchedule.findByIdAndDelete(id);
      res.json({ message: "Leave schedule deleted successfully" });
    } catch (error) {
      console.error("Error deleting leave schedule:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/userleavehistory", async(req,res)=>{
    try{
        const {email}=req.body
        const history=await historydata.find({email:email})
        res.json(history)
    }catch(e){res.json("error")}
} )

app.post("/updates", async(req,res)=>{
    try{
        const {email}=req.body
        const history=await userdetails.find({email:email})
    res.json(history)
    }catch(e){res.json("error")}
} )