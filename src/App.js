import './App.css';
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'dayjs/locale/en-gb';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);}
    
  return (
    <div className="App">
      <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="CUSTOMER" />
            <Tab value="two" label="TRAINING" />
      </Tabs>
      {value === 'one' && (<div><CustomerList /></div>)}
      {value === 'two' && (<div><TrainingList /></div>)}
    </div>
  );
}

export default App;
