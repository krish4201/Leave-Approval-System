import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import profile from '../icons/profile.png';
import Logo from '/white-logo.png';
import axios from 'axios';
import style from '../style/faculty.module.css'; // Import your custom CSS file for styling
import {useLocation,useNavigate} from 'react-router-dom';
import styles from "../style/leaveRequest.module.css"

function leaveRequest() {
    const [time, setTime] = useState(new Date());
    const [data, setData] = useState([]);
    const [response, setresponse] = useState([]);
    const location=useLocation();
    const user=location.state.id;
    const [rows, setRows] = useState([]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
    
        const fetchData = async () => {
            try {
                let responseData;
                if (user.role === "hod") {
                    responseData = await axios.post("http://localhost:8000/getleaveforhod");
                } else {
                    responseData = await axios.post("http://localhost:8000/getleavefordean");
                }
                // console.log("Hello",    responseData.data)
                if(responseData.data.length ==0){
                        const t = document.getElementById("Hello")
                        t.textContent="No Records";
                        t.style.display ="flex";
                        // t.style.alignItems="center";
                        t.style.justifyContent="center"
                        t.style.fontSize="3em"


                }
                setRows(responseData.data);
                setData(responseData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
        
        return () => clearInterval(intervalId);
        
    }, [user.role]); 
   


    // if (rows){
    // const t = document.getElementById("Hello");
    // console.log(t);
    // }
    async function handleDecline(email,applieddate,leavetype,startdate,enddate,dept){
        try {
            await axios.post("http://localhost:8000/decline", {
                email,applieddate,leavetype,startdate,enddate,dept
            });
            console.log("User removed successfully!");
        } catch (error) {
            console.error("Error removing user:", error);
        }
    }
    async function handleForward(email,applieddate,leavetype,startdate,enddate,dept){
        try {
            await axios.post("http://localhost:8000/forward", {
                email,applieddate,leavetype,startdate,enddate,dept
            });
            console.log("User forward successfully!");
        } catch (error) {
            console.error("Error removing user:", error);
        }
    }
    async function handleAccept(email,applieddate,leavetype,startdate,enddate,dept){
        try {
            await axios.post("http://localhost:8000/accept", {
                email,applieddate,leavetype,startdate,enddate,dept
            }).then((res)=>console.log(res.data));
            console.log("User accept successfully!");
        } catch (error) {
            console.error("Error removing user:", error);
        }
    }

    const columns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            sortable: false,
            center:true,
            width: "80px",
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "Name",
            selector: (row) => row.email,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "Email ID",
            selector: (row) => row.email,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "Department",
            selector: (row) => row.dept,
            sortable: true,
            center:true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "Start Date",
            selector: (row) => row.startdate,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "End Date",
            selector: (row) => row.enddate,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "Applied Date",
            selector: (row) => row.applieddate,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "Actions",
            cell: (row) => {
                if (user.role === "dean") {
                    return (
                        <div>
                            <button className={styles.leavebutton} id={styles["forward"]} 
                            onClick={() => {handleAccept(row.email,row.applieddate,row.leavetype,row.startdate,row.enddate,row.dept);
                                handleRemove(row._id, row.email)}}>Accept</button>
                            <button className={styles.leavebutton} id={styles["decline"]} 
                            onClick={() => {handleDecline(row.email,row.applieddate,row.leavetype,row.startdate,row.enddate,row.dept);
                                handleRemove(row._id, row.email)}}>Decline</button>
                        </div>
                    );
                } else if (user.role === "hod") {
                    return (
                        <div>
                            <button className={styles.leavebutton} id={styles["forward"]} 
                            onClick={() => {handleForward(row.email,row.applieddate,row.leavetype,row.startdate,row.enddate,row.dept);
                                handleRemove(row._id, row.email)}}>Forward</button>
                            <button className={styles.leavebutton} id={styles["decline"]} 
                            onClick={() => {handleDecline(row.email,row.applieddate,row.leavetype,row.startdate,row.enddate,row.dept)
                                handleRemove(row._id, row.email)}}>Decline</button>
                        </div>
                    );
                } else {
                    return null;
                }
            },
            button: true,
            width: "350px"
        },
    ];

//     useEffect(() => {
//   const t = document.getElementById("Hello");
  
//   if (!t) return; // Guard clause for missing element
  
//   if (rows[0] === undefined) {
//     t.textContent = "No Records";
//     t.style.display = "flex";
//     t.style.justifyContent = "center";
//     t.style.fontSize = "3em";
//   } else {
//     // Reset only the styles you set
//     t.style.display = "";
//     t.style.justifyContent = "";
//     t.style.fontSize = "";
//     t.textContent = ""; // Optional: clear text too
//   }
// }, [rows]);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = rows.filter((row) =>
            Object.values(row).some(
                (value) =>
                    typeof value === "string" && value.toLowerCase().includes(searchTerm)
            )
        );
        setData(filteredData);
    };
    const handleRemove = (idToRemove, emailToRemove) => {
        // Filter out the row with the given idToRemove
        const updatedData = data.filter((row) => row._id !== idToRemove);
        setData(updatedData);
        // removeuser(emailToRemove);
        // Now you can use the emailToRemove as needed
        console.log("Email to remove:", emailToRemove);
    };
    const customStyles = {
        head: {
            
            style: {
                fontSize: '18px',
                // marginLeft:"20px"
            },
        },
    };
    

    return (
        <>
            <header className="header">
                <img src={Logo} alt="logo" id='headeralign' />
                <div className="portalname" id='headeralign'>Welcome</div>
                <div className="profile" id='headeralign'>
                    <div className="Flex">
                        <span>{time.toLocaleTimeString()}</span>
                        <span>{time.toLocaleDateString()}</span>
                    </div>
                    <img src={profile} alt="profile" className="profilepic" />
                </div>
            </header>
            <div className={style.contain} id ="Hello" >
                <div className="input-group">
                    <input
                        type="search"
                        className={style.usersearch}
                        placeholder="Search"
                        onChange={handleSearch}
                    />
                </div>
                <DataTable className={style.tables}
                columns={columns}
                data={data} // Apply custom class here
                pagination
                customStyles={customStyles}
                />
            </div>
        </>
    );
}
export default leaveRequest;
