<h1 align="center">UTSC Intramural Ice Hockey Team</h1>
<p>Using: TypeScript, Next.js, React.js, TailwindCSS, Framer Motion, Git, Jira</p>
<p>Planning 2 use: GraphQL, Python (chatbot), react-big-calendar, ...</p>

For future react-big-calendar reference:
- npm install --save @fullcalendar/react @fullcalendar/daygrid
```
// components/Calendar.js
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          // Add your events here, e.g., [{ title: 'Event 1', date: '2023-09-15' }]
        ]}
      />
    </div>
  );
};

export default Calendar;
```
```
// pages/index.js
import React from 'react';
import Calendar from '../components/Calendar';

const Home = () => {
  return (
    <div>
      <h1>My Calendar App</h1>
      <Calendar />
    </div>
  );
};

export default Home;
```

