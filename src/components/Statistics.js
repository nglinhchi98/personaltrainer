//Rexcharts imports
import { 
    BarChart, 
    Bar,  
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
   } from 'recharts';
  import Container from '@mui/material/Container';
  import React, {useState,useEffect} from 'react';
  
  export default function Statistics() {
      let _ = require('lodash');
  
      const[inputData,setInputData]= useState([{}]);
      const[open,setOpen]=useState(false)
      const[data,setData]=useState([]);
  
      const getData = () => {
          fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings')
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                alert('Something went wrong with fetching data.');
              }
            })
             
            .then((data) => {
              setInputData(data.map((content)=>({
                activity: content.activity,
                duration: content.duration,
              })));
              setOpen(true);
            })
              .catch(err=> console.error(err))
          };
  
      useEffect(()=>{
          getData();
       },[])
      
     
          if(open){
              const grouped = _.groupBy(inputData, 'activity');
              
              const chartData = [];
              for(let activity in grouped){
                chartData.push({
                  activity: activity,
                  duration: _.sumBy(grouped[activity], 'duration')
                });
              }
              setData(chartData);
              setOpen(false);
            }
  
      return (
          <div>
              <h2>Training statistics</h2>
          <Container 
              maxWidth="90%" 
              maxHeight="90%" 
              sx={{
                  backgroundColor:'white',
                  borderRadius: '25px',
                  padding:4,
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center'
              }}>
              <BarChart
              width={1000}
              height={550}
              data={data}
              margin={{
                  top: 10,
                  right: 50,
                  left: 50,
                  bottom: 5,
              }}
              >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="activity" />
            <YAxis label={{ value: 'Duration (minutes)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="duration" fill="#00a8ad" />
          </BarChart>
        </Container>
        </div>
      );
      
    
  }
