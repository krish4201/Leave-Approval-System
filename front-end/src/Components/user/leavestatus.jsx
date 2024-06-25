import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import profile from '../icons/profile.png';
import Logo from '/white-logo.png'; // Corrected the path to the logo
import axios from 'axios';
import stylew from '../style/leavestatus.module.css'; // Import your custom CSS file for styling
import { useLocation, useNavigate } from 'react-router-dom';

function leavestatus() { // Changed component name to start with a capital letter

    const [time, setTime] = useState(new Date());
    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    const [hod, setHod] = useState(null);
    const [leavestat, setleavestat] = useState(null);
    
    const location = useLocation();
    const user = location.state.id;
    const history = useNavigate();
    async function fetchData () {
        try {
            const response = await axios.post("http://localhost:8000/status", { email: user.email });
            console.log(response.data[0].status)
            // console.log(response.data[0].status)
            // if (response.status)
                setRows(response.data);
                setData(response.data);
                setleavestat(response.data[0].status)
            // const hodObject = response.data[0].hod[0];
            // console.log(hodObject) // Assuming there is only one HOD
        // setHod(hodObject);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {
        fetchData();

        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [user.email]); // Added user.email to the dependency array

    const columns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            sortable: false,
            center:true,
            width: "80px",
            style: {
                fontSize: "18px",
                // marginLeft:"20px"
            }
        },
        {
            name: "Email ID",
            selector: (row) => user.email,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "Status",
            selector: (row) => leavestat,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        }
    ];

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

    const customStyles = {
        head: {
            style: {
                fontSize: '18px',
            },
        },
    };

    return (
        <>
            <header className="header">
                <img src={Logo} alt="logo" id='headeralign' />
                <div className="portalname" id='headeralign'>Faculty List</div>
                <div className="profile" id='headeralign'>
                    <div className="Flex">
                        <span>{time.toLocaleTimeString()}</span>
                        <span>{time.toLocaleDateString()}</span>
                    </div>
                    <img src={profile} alt="profile" className="profilepic" />
                </div>
            </header>
            <div className={stylew.contain}>
                <div className="input-group">
                    <input
                        type="search"
                        className={stylew.usersearch}
                        placeholder="Search"
                        onChange={handleSearch}
                    />
                </div>
                <DataTable
                    className={stylew.tables}
                    columns={columns}
                    data={data}
                    pagination
                    customStyles={customStyles}
                />
            </div>
        </>
    );
}

export default leavestatus;
