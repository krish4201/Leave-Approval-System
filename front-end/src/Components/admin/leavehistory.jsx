import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import profile from '../icons/profile.png';
import Logo from '/white-logo.png';
import axios from 'axios';
import style from '../style/faculty.module.css'; // Import your custom CSS file for styling

function leavehistory() {
    const [time, setTime] = useState(new Date());
    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:8000/leavehistory");
                setRows(response.data); // assuming response.data is an array of objects
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    async function removeuser(emailToRemove) {
        try {
            await axios.post("http://localhost:8000/remove", {
                email: emailToRemove
            });
            console.log("User removed successfully!");
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
            selector: (row) => row.name,
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
            selector: (row) => row.role,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "start date",
            selector: (row) => row.startdate,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "end date",
            selector: (row) => row.enddate,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "applied date",
            selector: (row) => row.applieddate,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "leave type",
            selector: (row) => row.leavetype,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        {
            name: "status",
            selector: (row) => row.status,
            sortable: true,
            style: {
                fontSize: "18px",
            }
        },
        
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
    const handleRemove = (idToRemove, emailToRemove) => {
        // Filter out the row with the given idToRemove
        const updatedData = data.filter((row) => row._id !== idToRemove);
        setData(updatedData);
        removeuser(emailToRemove);
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
            <div className={style.contain}>
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

export default leavehistory;
