import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import moment from "moment-timezone";
import Container from '@mui/material/Container'

function CalendarPage() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {})
      .then((response) => {
        if(response.ok) {
          return response.json(); 
        } else {
          alert('Error fetching data');
        }
      })
      .then(responseData => {
        let data = [];
        responseData.map(item =>
          data.push(
            {
              title: item.activity + ' / ' + item.customer.firstname + ' ' + item.customer.lastname,
              start: moment(item.date).tz('Europe/Helsinki').format(),
              end: moment(item.date).add(1, 'hours').tz('Europe/Helsinki').format(),
              allDay: false,
              color: item.type === "strength" ? "#007bff" : "#28a745"
            }
          ));
        setTrainings(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Container 
        sx={{
          maxWitdh:'80%',
          marginTop: 10,
          marginBottom: 20
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, momentTimezonePlugin]}
          initialView="dayGridMonth" 
          height={'90vh'}
          weekends={true}
          events={trainings}
          timeZone="Europe/Helsinki"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
        />
      </Container>
    </div>
  );
}

export default CalendarPage;
