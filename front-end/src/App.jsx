import {BrowserRouter as Router , Routes,Route,Link} from 'react-router-dom';
import login from './Components/login';
import UserDashboard from './Components/user/UserDashboard';
import createprofile from './Components/admin/createprofile';
import updateprofile from './Components/user/updateprofile';
import admin from './Components/admin/admin';
import applyleave from './Components/user/applyleave';
import leaveRequest from './Components/admin/leaveRequest';
import facultylist from './Components/faculty/facultylist';
import leavehistory from './Components/admin/leavehistory';
import leavestatus from './Components/user/leavestatus';
import CalendarView from './Components/user/CalendarView';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={login} />
        <Route exact path='/login' Component={login} />
        <Route exact path='/admin' Component={admin} />
        <Route exact path='/admin/createprofile' Component={createprofile} />
        <Route exact path='/admin/leaverequests' Component={leaveRequest} />
        <Route exact path='/userdashboard' Component={UserDashboard} />
        <Route exact path='/userdashboard/updateprofile' Component={updateprofile} />
        <Route exact path='/userdashboard/applyleave' Component={applyleave} />
        <Route exact path='/admin/facultylist' Component={facultylist} />
        <Route exact path='/admin/leavehistory' Component={leavehistory} />
        <Route exact path='/userdashboard/leavestatus' Component={leavestatus} />
        <Route exact path='/userdashboard/CalendarView' Component={CalendarView} />
      </Routes>
    </Router>
  )
}

export default App
