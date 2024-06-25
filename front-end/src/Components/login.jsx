
import {useState } from 'react';
import './style/login.css';
import logo from '/Logo.png';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom"
function login() {
    const history=useNavigate();
    const  [email,setemail] =useState("");
    const  [pwd,setpwd] =useState("");
    const user=(e)=>{
        setemail(e.target.value);
    };
    // history("/userdashboard",{state:{id:email}})
    const passw=(e)=>{
        setpwd(e.target.value);
    };
    async function submit(e){
        e.preventDefault();
        try{
            await axios.post("http://localhost:8000/login",{
            email
            ,pwd
            })
            .then((res)=>{
                if(res.data[0]=="admin"){
                    history("/admin",{state:{id:res.data[1]}})
                }
                else if(res.data[0]=="user"){
                    history("/userdashboard",{state:{id:res.data[1]}})
                }
                else if(res.data[0]=="wrong"){
                    document.getElementById("status").textContent="Password Wrong"
                }
                else if(res.data=="notexist"){
                    document.getElementById("status").textContent="User Not Found"
                }
            })
        }
        catch(e){
            alert("Error r: ",e)
        }
    };
    return (
      <div className='page'>
        <div id='detail'>
        <img src={logo} alt="" />
        <form className='form' action="POST">
          <h2>Please Login!</h2>
          <input className='input' type="email" placeholder="Email" onKeyUp={(e)=>{user(e)}} required/>
          <input className='input' type="password" placeholder="Password" onKeyUp={(e)=>{passw(e)}} required/>
          <p id="status" ></p>
          <input id="submit-btn" type="submit" onClick={submit}/>
        </form>
        </div>
      </div>
    )
  }
  
  export default login