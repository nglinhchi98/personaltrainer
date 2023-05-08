import './App.css';
import React, { useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'dayjs/locale/en-gb';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar';

function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
  setValue(value);}

  return (
    <div className="App">
      <h1>Fitworks - Personal Training</h1>
      <Tabs value={value} onChange={handleChange} 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
            <Tab value="one" label="CUSTOMER" 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              marginLeft: '15px'
            }}/>
            <Tab value="two" label="TRAINING"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              marginLeft: '15px'
            }} />
            <Tab value="three" label="Calendar"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              marginLeft: '15px'
            }} />
      </Tabs>
      {value === 'one' && (<div><CustomerList /></div>)}
      {value === 'two' && (<div><TrainingList /></div>)}
      {value === 'three' && (<div><Calendar /></div>)}

    </div>
  );
}

export default App;
