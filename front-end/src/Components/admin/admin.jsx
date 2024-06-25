import { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import logo from '/white-logo.png';
import Profile from '../icons/profile.png';
import '../style/admin.css';
import add from '../icons/add-user.png';
import remove from '../icons/user.png';
import leaveRequests from '../icons/leaveRequestList.png';
import leaveHistory from '../icons/leaveHistory.png';
import list from '../icons/list.png';
import policies from '../icons/policies.png';
import '../style/user.css'
function admin() {
    const history = useNavigate();
    const [time,setTime]=useState(new Date());
    useEffect(()=>{
        setInterval(()=>setTime(new Date()),1000)
    },[]);
    const location=useLocation();
    const user=location.state.id;
    
    // console.log(user)
    const adduser=()=>{
        history("./createprofile",{state:{id:user}})
    }
    const leaverequest=()=>{
        history("./leaverequests",{state:{id:user}})
    }
    const facultylist=()=>{
        history("./facultylist",{state:{id:user}})
    }
    const leavehistory=()=>{
        history("./leavehistory",{state:{id:user}})
    }
  return (
    <section>
        <header className="header">
                <img src={logo} alt="logo"  id='headeralign' />
                <div className="portalname" id='headeralign' >Welcome {user.name}</div>
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
        <div id='portal-rest'>
            <div id="portalrestbutton">
                <button id="PortalButton" onClick={adduser}>
                    <img src={add} alt="Add Profile" />
                    <span >Add Faculty</span>
                </button>
                <button id="PortalButton" onClick={facultylist }>
                    <img src={remove} alt="Add Profile" />
                    <span>Remove Faculty</span>
                </button>
                <button id="PortalButton">
                    <img src={policies} alt="Add Profile" />
                    <span>Leave Policies</span>
                </button>
                <button id="PortalButton" onClick={leaverequest}>
                    <img src={leaveRequests} alt="Add Profile" />
                    <span>Leave Requests</span>
                </button>
                <button id="PortalButton" onClick={leavehistory}>
                    <img src={leaveHistory} alt="Add Profile" />
                    <span>Leave Requests History </span>
                </button>
            </div>
        </div>
    </section>
  )
}

export default admin
