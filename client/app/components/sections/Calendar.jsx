import React from 'react';
import styled, { withTheme } from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Bluebird from 'bluebird';

const Container = styled.section`
  margin: auto;
  padding 5px;
  height: 90vh;
`;

const Calendar = () => {
  const calendarRef = React.createRef();

  const add = ({title}) => {
    console.log('Calendar Ref:', calendarRef);
    const calendarApi = calendarRef.current.getApi();
    const events = calendarApi.getEvents();
    const startAndEndTimes = events.map((e) => {
      console.log(e);

      return {
        day: Number(e.start.toString().split(' ')[2]),
        start: e.start.toString().split(' ')[4].split(':').reduce((result, p, i) => {
          // console.log(p);
          if (i <= 1) {
            result = result + p;
            return result
          }

          return result;
        }, ''),
        end: e.end.toString().split(' ')[4].split(':').reduce((result, p, i) => {
          if (i <= 1) {
            result = result + p;
            return result
          }

          return result;
        }, '')
      }
    })

    console.log('Start/End Times:', startAndEndTimes);
    const currentTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), new Date().getHours() + 8);

    let overlap = false;

    for (let i = 0; i < startAndEndTimes.length; i++) {
      let event = startAndEndTimes[i];

      if (!(Number(currentTime.toString().split(' ')[4].split(':').reduce((result, p, i) => {
          if (i <= 1) {
            result = result + p;
            return result
          }

          return result;
        }, '')) >= Number(event.start))

          && !(Number(currentTime.toString().split(' ')[4].split(':').reduce((result, p, i) => {
            if (i <= 1) {
              result = result + p;
              return result
            }
  
            return result;
          }, '')) <= Number(event.end)) || Number(currentTime.toString().split(' ')[2]) !== event.day) {

        continue;
        
      } else {
        overlap = true;
      }
    }

    if(!overlap) {
      calendarApi.addEvent({
        title,
        start: currentTime
      });
    } else {
      console.log('Cannot add overlapping appointments!');
    }

    return;
  };

  return (
    <Container>
      <FullCalendar
        ref={calendarRef}

        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

        initialView='timeGridWeek'

        editable={false}

        customButtons={{
          bookAppointment: {
            text: 'Book Appointment',
            click: () => {
              const title = prompt('Enter title:');
              add({title})
              console.log('Sent event...');
            }
          }
        }}

        headerToolbar={{
          left: 'today bookAppointment',
          center: 'title',
          right: 'timeGridWeek,timeGridDay next'
        }}

        dateClick={(info) => {
          console.log('Date Click:', info);
          // info.dayEl.style.backgroundColor = 'red';
        }}

        // selectOverlap={(event) => {
        //   console.log('Select Overlap:', event)
        // }}
        selectOverlap={false}

        eventTextColor={'rgb(0,102,204)'}
        eventBorderColor={'rgb(0,102,204)'}
        eventBackgroundColor={'rgb(204,229,255)'}
        
        events={[
          {
            title: 'BCH132',
            start: '2021-08-07T10:30:00',
            end: '2021-08-07T11:30:00',
            extendedProps: {
              department: 'BioChemistry'
            },
            description: 'Lecture'
          },
          {
            title: 'BCH132',
            start: '2021-08-07T10:10:00',
            end: '2021-08-07T10:30:00',
            extendedProps: {
              department: 'BioChemistry'
            },
            description: 'Lecture'
          },
          {
            title: 'BCH132',
            start: '2021-08-07T20:10:00',
            end: '2021-08-07T21:30:00',
            extendedProps: {
              department: 'BioChemistry'
            },
            description: 'Lecture'
          }
          // more events ...
        ]}
        eventDidMount={(arg) => {
          console.log('Event Did Mount:', arg.event);
          // arg.event.remove();
        }}
        eventOverlap={(still, moving) => {
          console.log('Event Overlap:', still, moving);
        }}

        height={'100%'}
      />
    </Container>
  );
};

export default Calendar;
