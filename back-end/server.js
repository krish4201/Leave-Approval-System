const express=require("express");
const app=express();
const dotenv=require('dotenv').config();
const cors =require("cors");
const status = require("statuses");
const mongo = require("./mongoScheme/DB");
const userdetails = require("./mongoScheme/userdetails");
const logindatas = require("./mongoScheme/logindata");

const nodemailer = require("nodemailer");
const { default: leaveRequest } = require("../front-end/src/Components/admin/leaveRequest");

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

//Login
app.post("/",async (req,res)=>{
    const { email ,pwd }= req.body
    try{
        const finduser =await logindatas.findOne({email:email})
        const user=await userdetails.findOne({email:email})
        if(finduser.role=="admin"){
            res.json(finduser.pwd==pwd ? ["admin",user]:["wrong",user])
        }
        else if(finduser.role=="user") {
            res.json(finduser.pwd==pwd? ["user",user]:["wrong",user])
        }
        else{
            res.json("notexist")
        }
        
    }
    catch{
        res.json("notexist")
    }
})


//Update USER from ADMIN
app.post("/update",async(req,res)=>{
    const details=req.body
    try{
        const finduser=await userdetails.find({email:details.email})
        // if(finduser){
        //     // await userdetails.updateOne({email:details.email},user)
            // const updates=await userdetails.updateOne({email:details.email},user)
            // if(updates){
            //     res.json("updates")
            // }
            // else{
            //     res.json("not Updated")
            // }
        // }
        res.json(await userdetails.findOne({email:details.email}))
    }catch{
        res.json("Error While updation")
    }    
})

//Creating USER from ADMIN
app.post("/create",async(req,res)=>{
    const user=req.body
    try{
        const finduser = await logindatas.findOne({email : user.email})
        if(finduser){
            res.json("already exist")
        }
        else{
            const test=await userdetails.create(user)
            const pwd=Math.floor(Math.random()*100000000)
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
            const login= await logindatas.create({email:user.email,pwd:pwd,role:user.role})
            if(test && login){
                res.json("created")
            }
            else{
                res.json("not created")
            }
        }
    }catch{
        res.json("Error while Creating")
    }
})

// leavedecline



