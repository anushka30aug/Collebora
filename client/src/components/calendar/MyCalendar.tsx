// const MyCalendar =():React.JSX.Element=>{
//     return(
//         <div>

//         </div>
//     )
// }

// export default MyCalendar;

import React from 'react';
import { Calendar, momentLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import style from '../../CSS/Calendar/MyCalendar.module.css'

// Create a localizer using Moment.js
const localizer = momentLocalizer(moment);

// Define the type for an event
interface MyEvent extends BigCalendarEvent {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

// Define props type for MyCalendar
interface MyCalendarProps {
  events?: MyEvent[];
}

const MyCalendar=( prop:MyCalendarProps):React.JSX.Element => {
  return (
    <div className={style.MyCalendarContainer} >
      <Calendar
        localizer={localizer}
        events={prop.events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
