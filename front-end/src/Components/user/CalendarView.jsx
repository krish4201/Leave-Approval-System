import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import logo from '/white-logo.png';
import Profile from '../icons/profile.png';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CalendarView = () => {
  const [leaveSchedules, setLeaveSchedules] = useState([]);
  const [time, setTime] = useState(new Date());
  const location = useLocation();
  const user = location.state.id;

  useEffect(() => {
    fetchLeaveSchedules(user.email);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [user.email]);

  async function fetchLeaveSchedules(email) {
    try {
      const response = await axios.post("http://localhost:8000/userleavehistory", { email:user.email });
      const data = response.data[0];
      console.log(data)
      const formattedData = data.map(schedule => ({
        title: schedule.email,
        start: schedule.startdate,
        end: schedule.enddate,
        leaveType: schedule.leavetype,
      }));
      setLeaveSchedules(formattedData);
    } catch (error) {
      console.error('Error fetching leave schedules:', error);
    }
  };

  const getEventColor = (leaveType) => {
    switch (leaveType) {
      case 'general':
        return 'blue';
      case 'vacation':
        return 'green';
      case 'medical':
        return 'red';
      case 'Compensatory Leave':
        return 'orange';
      default:
        return 'gray';
    }
  };

  return (
    <section>
      <header className="header">
        <img src={logo} alt="logo" id="headeralign" />
        <div className="portalname" id="headeralign">
          Calendar View
        </div>
        <div className="profile" id="headeralign">
          <div id="Flex">
            <span>{time.toLocaleTimeString()}</span>
            <span>{time.toLocaleDateString()}</span>
          </div>
          <img src={Profile} alt="profile" className="profilepic" />
        </div>
      </header>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={leaveSchedules.map((schedule) => ({
            title: schedule.title,
            start: schedule.start,
            end: schedule.end,
            color: getEventColor(schedule.leaveType),
          }))}
          aspectRatio={3}
        />
      </div>
    </section>
  );
};

export default CalendarView;