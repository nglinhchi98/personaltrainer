import './App.css';
import {
  HashRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import * as React from "react";
import CustomerList from './components/CustomerList';
import TrainingList from "./components/TrainingList";
import CalendarPage from "./components/Calendar";
import HomePage from "./components/HomePage";
import Statistics from './components/Statistics';


function App() {

  return (
    <div className="App">
      <img 
      src={`${process.env.PUBLIC_URL}/images/Fitworks-logo.jpg`} 
      alt="Fitworks logo"
      style={{width: '100px', height: '100px', marginBottom: '30px'}} />
      <br></br>
      <HashRouter>
            <Link to="/" style={{ textDecoration: 'none', color:'#00a8ad', fontWeight:'bold', margin:'10px', fontSize:'20px'}}>Home</Link>{' '}
            <Link to="/training" className="link" style={{ textDecoration: 'none', color:'#00a8ad', fontWeight:'bold', margin:'10px', fontSize:'20px'}} >Training</Link>{' '}
            <Link to="/customer" className="link" style={{ textDecoration: 'none' , color:'#00a8ad', fontWeight:'bold', margin:'10px', fontSize:'20px' }}>Customer</Link>{' '}
            <Link to="/calendar" className="calendar" style={{ textDecoration: 'none' , color:'#00a8ad', fontWeight:'bold', margin:'10px', fontSize:'20px' }}>Calendar</Link>{' '}
            <Link to="/statistics" className="statistics" style={{ textDecoration: 'none' , color:'#00a8ad', fontWeight:'bold', margin:'10px', fontSize:'20px' }}>Statistics</Link>{' '}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/training" element={<TrainingList />} />
                <Route path="/customer" element={<CustomerList />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/statistics" element={<Statistics />} />

            </Routes>
        </HashRouter>
      
    </div>
  );
}

export default App;