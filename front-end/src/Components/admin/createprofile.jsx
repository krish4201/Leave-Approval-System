import { useState,useEffect } from 'react';
import logo from '/white-logo.png';
import Profile from '../icons/profile.png';
import '../style/addfaculty.css';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
function createProfile(){
    const [time,setTime]=useState(new Date());
    useEffect(()=>{
        setInterval(()=>setTime(new Date()),1000)
    },[]);
    const history = useNavigate();
    const location=useLocation();
    const user=location.state;
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [role,setrole]=useState("");
    const [doj,setdoj]=useState("");
    const [dept,setdept]=useState("");
    const [address1,setaddress1]=useState("");
    const [address2,setaddress2]=useState("");
    const [address3,setaddress3]=useState("");
    const [phd,setphd]=useState("");
    const [phduniversity,setphduniversity]=useState("");
    const [phdpoyear,setphdpoyear]=useState("");
    const [masters,setmasters]=useState("");
    const [mastersuniversity,setmastersuniversity]=useState("");
    const [masterspoyear,setmasterspoyear]=useState("");
    const [bachelors,setbachelors]=useState("");
    const [bachelorsuniversity,setbachelorsuniversity]=useState("");
    const [bachelorspoyear,setbachelorspoyear]=useState("");
    const check=()=>{
    if(role=="dean"){
        document.getElementById("dept").style.display="none";
        document.getElementById("depts").style.display="none";
    }
    else{
        document.getElementById("dept").style.display="block";
        document.getElementById("depts").style.display="block";
    };
    };
    const values = document.getElementsByClassName("emails");    console.log(role);
    async function createaccount(e){
        const values = document.getElementsByClassName("emails");
        
        e.preventDefault();
        if(role=="dean"){
            await axios.post("http://localhost:8000/create",{   
            name:name,
            email:email,
            role:role,
            doj:doj,
            address1:address1,
            address2:address2,
            address3:address3,
            phd:phd,
            phduniversity:phduniversity,
            phdpoyear:phdpoyear,
            masters:masters,
            mastersuniversity:mastersuniversity,
            masterspoyear:masterspoyear,
            bachelors:bachelors,
            bachelorsuniversity:bachelorsuniversity,
            bachelorspoyear:bachelorspoyear,
        }).then((res)=>
            document.getElementById("accountstatus").textContent=res.data)}
        else{
            await axios.post("http://localhost:8000/create",{   
            name:name,
            email:email,
            role:role,
            doj:doj,
            dept:dept,
            address1:address1,
            address2:address2,
            address3:address3,
            phd:phd,
            phduniversity:phduniversity,
            phdpoyear:phdpoyear,
            masters:masters,
            mastersuniversity:mastersuniversity,
            masterspoyear:masterspoyear,
            bachelors:bachelors,
            bachelorsuniversity:bachelorsuniversity,
            bachelorspoyear:bachelorspoyear,
        }).then((res)=>document.getElementById("accountstatus").textContent=res.data)}}
    return (
        <section >
            <header className="header">
                <img src={logo} alt="logo"  id='headeralign' />
                <div className="portalname" id='headeralign' >Create Account</div>
                <div className="profile"  id='headeralign' >
                    <div id="Flex"> 
                        {/* <span>{location.state.id.name}</span> */}
                        <span>{time.toLocaleTimeString()}</span>
                        {/* <span>{location.state.id.dept}</span> */}
                        <span>{time.toLocaleDateString()}</span>
                    </div>
                    <img src={Profile} alt="profile" className="profilepic" />
                </div>
            </header>
            <div id="profileDetial" >
                <div id="left-side">
                <img src={Profile} alt="" id="userprofile"  />
                <div id="userDetails">
                    <h3>Name</h3>
                    <input type="text" placeholder="Name" id='inputs' onKeyUp={(e)=>{setname(e.target.value)}} />
                    <h3>Email</h3>
                    <input type="email" placeholder="Email" id='inputs' className='emails' onKeyUp={(e)=>{setemail(e.target.value)}}/>
                    <h3>Role</h3>
                    <select id="inputs" className="select" onChange={(e)=>{setrole(e.target.value);}} >
                        <option value="">--select</option>
                        <option value="dean">Dean</option>
                        <option value="hod">HOD</option>
                        <option value="faculty" >Faculty</option>
                    </select>
                    <h3 id='dept'>Dept</h3>
                    <select id="depts" className="select dept" onChange={()=>{setdept(document.getElementById("depts").value)}}>
                        <option value="">--select</option>
                        <option value="cse">CSE</option>
                        <option value="ai">AI</option>
                        <option value="cyber" >CYBER</option>
                    </select>
                    <h3>Date of Joining</h3>
                    <input type="date"  id='date' onChange={(e)=>{setdoj(e.target.value)}}/>
                </div>
                <h2 id='accountstatus'></h2>
                <button id='create-account-btn' onClick={createaccount}>Create Account</button>
                </div>
                <div id="right-side">
                    <div id="right-update">
                    <div id='headers'>
                            <h3>Address</h3>
                            <div id='free-text'>
                            <input type="text" id="address" placeholder='Address 1' defaultValue={user.address1} onChange={(e)=>setaddress1()} />
                            <input type="text" id="address" placeholder='Address 2' defaultValue={user.address2} onChange={(e)=>setaddress2} />
                            <input type="text" id="address" placeholder='Address 3' defaultValue={user.address3} onChange={(e)=>setaddress3} />
                            
                            </div>
                        </div>
                        <div id='headers'>
                            <h3>Doctorate of Philosophy</h3>
                            <div id='free-text'>
                            <input type="text" id="address" placeholder='Field' defaultValue={user.phd} onChange={(e)=>setphd(e.target.value)} />
                            <input type="text" id="address" placeholder='university' defaultValue={user.phduniversity} onChange={(e)=>setphduniversity(e.target.value)} />
                            <input type="text" id="address" placeholder='year' defaultValue={user.phdpoyesr} onChange={(e)=>setphdpoyear(e.target.value)} />
                            </div>
                        </div>
                        <div id='headers'>
                            <h3>Masters</h3>
                            <div id='free-text'>
                            <input type="text" id="address" placeholder='Field'defaultValue={user.masters} onChange={(e)=>setmasters(e.target.value)} />
                            <input type="text" id="address" placeholder='university'defaultValue={user.mastersuniversity} onChange={(e)=>setmastersuniversity(e.target.value)} />
                            <input type="text" id="address" placeholder='year'defaultValue={user.masterspoyesr} onChange={(e)=>setmasterspoyear(e.target.value)} />
                            </div>
                        </div>
                        <div id='headers'>
                        <h3>Bachelors</h3>
                            <div id='free-text'>
                            <input type="text" id="address" placeholder='Field' defaultValue={user.bachelors} onChange={(e)=>setbachelors(e.target.value)} />
                            <input type="text" id="address" placeholder='university' defaultValue={user.bachelorsuniversity} onChange={(e)=>setbachelorsuniversity(e.target.value)} />
                            <input type="text" id="address" placeholder='year' defaultValue={user.bachelorspoyear} onChange={(e)=>setbachelorspoyear(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div id="btn-div">
                    <button id='update-btn'  onClick={createaccount} >Update</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default createProfile