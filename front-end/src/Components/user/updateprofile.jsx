import { useState,useEffect } from 'react';
import logo from '/white-logo.png';
import Profile from '../icons/profile.png';
import '../style/addfaculty.css';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
function updateProfile(){
    const [time,setTime]=useState(new Date());
    useEffect(()=>{
        setInterval(()=>setTime(new Date()),1000);
        updates();
    },[]);
    const history = useNavigate();
    const location=useLocation();
    const [user,setuser]=useState(location.state.id);
    const [name,setname]=useState(user.name);
    const [email,setemail]=useState(user.email);
    const [address1,setaddress1]=useState("");
    const [address2,setaddress2]=useState("");
    const [address3,setaddress3]=useState("");
    const [dept,setdept]=useState("");
    const [phd,setphd]=useState("");
    const [phduniversity,setphduniversity]=useState("");
    const [phdpoyear,setphdpoyear]=useState("");
    const [masters,setmasters]=useState("");
    const [mastersuniversity,setmastersuniversity]=useState("");
    const [masterspoyear,setmasterspoyear]=useState("");
    const [bachelors,setbachelors]=useState("");
    const [bachelorsuniversity,setbachelorsuniversity]=useState("");
    const [bachelorspoyear,setbachelorspoyear]=useState("");
    
    // const check=()=>{console.log(dob)};
    async function updates(e){
        e.preventDefault();
        await axios.post("http://localhost:8000/updates",{email:user.email})
        .then((res)=>{setuser(res.data[0])})
    }
    async function updateaccount(e){
        e.preventDefault();
        
        try{
        await axios.post("http://localhost:8000/update",{
            dept:dept,
            name:name,
            email:email,
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
        }).then((res)=>document.getElementById("updatebtn").textContent=res.data            
        )
    }
    catch(e){
        console.log(e)}
    const edit=(e)=>{
        setname(e.target.value)
    }}
    console.log(user)
    return (
        <section>
        <header className="header">
            <img src={logo} alt="logo" id='headeralign' />
            <div className="portalname" id='headeralign'>
               Update Profile
            </div>
            <div className="profile"  id='headeralign'>
                <div className="Flex"> 
                    <span>{time.toLocaleTimeString()}</span>
                    <p> </p>
                    <span>{time.toLocaleDateString()}</span>
                </div>
                <img src={Profile} alt="profile" className="profilepic" />
            </div>
        </header>
        <div id="profileDetial">
            <div id="left-side">
            <img src={Profile} alt="" id="userprofile"  />
            <div id="userDetails">
                <h3>Name</h3>
                <input type="text" defaultValue={user.name} id='inputs' onKeyUp={(e)=>{setname(e.target.defaultValue)}} />
                <h3>Email</h3>
                <input type="email" defaultValue={user.email} id='inputs' onKeyUp={(e)=>{setemail(e.target.defaultValue)}}/>
                <h3>Role</h3>
                <input type="test" defaultValue={user.role} id='inputs'  readOnly/>
                <h3>Dept</h3>
                <select id="depts" className="select dept" value={user.dept} onChange={()=>{setdept(document.getElementById("depts").value)}}>
                        <option value="">--select</option>
                        <option value="cse">CSE</option>
                        <option value="ai">AI</option>
                        <option value="cyber" >CYBER</option>
                </select>
                <h3>Date of Joining</h3>
                <input type="text"  id='date' value={user.doj} />
            </div>
            </div>
            <div id="right-side">
                <div id="right-update">
                    <div id='headers'>
                        <h3>Address</h3>
                        <div id='free-text'>
                        <input type="text" id="address" placeholder='Address 1' defaultValue={user.address1} onChange={(e)=>setaddress1(e.target.value)} />
                        <input type="text" id="address" placeholder='Address 2' defaultValue={user.address2} onChange={(e)=>setaddress2(e.target.value)} />
                        <input type="text" id="address" placeholder='Address 3' defaultValue={user.address3} onChange={(e)=>setaddress3(e.target.value)} />
                        
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
                <h3 id="updatebtn"></h3>
                <div id="btn-div">
                <button id='update-btn' onClick={updateaccount}>Update</button>
                </div>
            </div>
        </div>
        </section>
    )
}
export default updateProfile