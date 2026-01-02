// UserDashboard.jsx
import React,{ useState , useEffect} from 'react';
import '../style/user.css';
import profile from '../icons/profile.png';
import Logo from '/white-logo.png';
import attendance from '../icons/attendance.png';
import course from '../icons/course.png';
import email from '../icons/email.png';
import exam from '../icons/exam.png';
import leave from '../icons/leave.png';
import onedrive from '../icons/onedrive.png';
import schedule from '../icons/schedule.png';
import word from '../icons/word.png';
import examcell from '../icons/examcell.png';
import gatepass from '../icons/gatepass.png';
import hostel from '../icons/hostel.png';
import issue from '../icons/issue.png';
import library from '../icons/library.png';
import {useLocation,useNavigate} from 'react-router-dom';
function UserDashboard() {
    const [time,setTime]=useState(new Date());
    useEffect(()=>{
        setInterval(()=>setTime(new Date()),1000)
    },[]);
    const location=useLocation();
    const user=location.state.id;
    const history=useNavigate();
    return (
        <section>
            <header className="header">
                <img src={Logo} alt="logo"  id='headeralign' />
                <div className="portalname" id='headeralign' >Welcome {user.name}</div>
                <div className="profile"  id='headeralign' >
                    <div className="Flex"> 
                        <span>{time.toLocaleTimeString()}</span>
                        <span>{time.toLocaleDateString()}</span>
                    </div>
                    <img src={profile} alt="profile" className="profilepic" />
                </div>
            </header>
            <div className="portalrest">
                <div className="portalrestbutton">
                    <button className="PortalButton"  onClick={(e)=>history("./applyleave",{state:{id:user}})}>
                        <img src={leave} alt="" />
                        <span>Apply Leave</span>
                    </button>
                    <button className="PortalButton"  onClick={(e)=>history("./leavestatus",{state:{id:user}})}>
                        <img src={leave} alt="" />
                        <span>Track Leave</span>
                    </button>
                    <button className="PortalButton" onClick={(e)=>history("./CalendarView",{state:{id:user}})} >
                        <img src={schedule} alt="" />
                        <span>Calender</span>
                    </button>
                    {/* <button className="PortalButton">
                        <img src={email} alt="" />
                        <span>Outlook</span>
                    </button>
                    <button className="PortalButton">
                        <img src={onedrive} alt="" />
                        <span>OneDrive</span>
                    </button>
                    <button className="PortalButton">
                        <img src={word} alt="" />
                        <span>Word</span>
                    </button> */}
                    <button className="PortalButton" onClick={(e)=>history("./updateprofile",{state:{id:user}})}>
                        <img src={profile} alt="" />
                        <span>Update Profile</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default UserDashboard;
