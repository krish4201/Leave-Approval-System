import {useLocation,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import profile from '../icons/profile.png';
import Logo from '/white-logo.png';
import style from '../style/leave.module.css';
import axios from 'axios';
import '../style/user.css'
function applyleave() {
    const [time,setTime]=useState(new Date());
    const location=useLocation();
    const user=location.state.id;
    const [name,setname]=useState(user.name);
    const [email,setemail]=useState(user.email);
    const [dept,setdept]=useState(user.dept);
    const history=useNavigate();
    const [leavetype,setleavetype]=useState("");
    const [startdate,setstartdate]=useState("");
    const [enddate,setenddate]=useState("");
    const [data,setdata]=useState({});
    useEffect(()=>{
        setdata({email:email,
            name:name,
            leavetype:leavetype,
            applieddate:time.toLocaleDateString().toString(),
            dept:dept,
            startdate:startdate,
            enddate:enddate,})
        setInterval(()=>setTime(new Date()),1000);
    },[]);
    async function submit(){
        await axios.post("http://localhost:8000/applyleave",{email:email,
        name:name,
        leavetype:leavetype,
        applieddate:time.toLocaleDateString().toString(),
        dept:dept,
        startdate:startdate,
        enddate:enddate}
        ).then((res)=>
        // console.log(res.data);
    document.getElementById("leavestatus").textContent=res.data)
    }
    console.log(enddate)
    return (
        <section>
            <header className={style.header}>
                <img src={Logo} alt="logo"  id={style['headeralign']} />
                <div className={style.portalname} id={style['headeralign']} >Apply Leave</div>
                <div className={style.profile} id={style['headeralign']} >
                    <div className={style.Flex}> 
                        <span>{time.toLocaleTimeString()}</span>
                        {/* <span>{location.state.id.name}</span> */}
                        <span>{time.toLocaleDateString()}</span>
                    </div>
                    <img src={profile} alt="profile" className={style.profilepic} />
                </div>
            </header>
            <div className={style.leavepage}>
                <div className={style.leftside}>
                    <img src={profile} alt="" />
                    <div className={style.userdetails} >
                        <h3 >Name</h3>
                        <input type="text" defaultValue={user.name} className={style.inputs} />
                        <h3 >Email</h3>
                        <input type="email" defaultValue={user.email} className={style.inputs} />
                        <h3 >Dept</h3>
                        <input type="text" defaultValue={user.dept} name="" className={style.inputs} />
                    </div>
                </div>
                <div className={style.rightside}>
                    <div className={style.leaverest} >
                        <h3>Leave Type</h3>
                        <select  id={style['leavetype']} onChange={(e)=>setleavetype(e.target.value)}>
                            <option value="">--select</option>
                            <option value="general">General Leave</option>
                            <option value="vacation">Vacation Leave</option>
                            <option value="medical">Medical Leave</option>
                            <option value="compensatory">Compensatory Leave</option>
                        </select>
                        <h3>start date</h3>
                        <input type="date" name="" id="" onChange={(e)=>{setstartdate(e.target.value)}}/>
                        <h3>end date</h3>
                        <input type="date" name="" id="" onChange={(e)=>{setenddate(e.target.value)}}/>
                    </div>
                    <h1 id='leavestatus'></h1>
                    <button className={style.submit} onClick={submit}>Submit Request</button>
                </div>
            </div>
        </section>
    )
}
export default applyleave