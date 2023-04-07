import React, { useState, useContext, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { jestrContext } from "../../App";
import ScheduleForm from "./ScheduleForm";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const { options, setOptions } = React.useContext(jestrContext);

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch(options.reservationsUrl)
      .then((results) => results.json())
      .then((data) => data)
      .then((data) => data.d.results)
      .then((results) => setReservations(results));
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const handleEventClick = (reservation) => {
    setSelectedEvent(reservation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={reservations}
        views={{ month: true, week: true, day: true, agenda: true }}
        titleAccessor="Cal_x0020_Title"
        startAccessor={(event) => {
          return new Date(event.EventDate);
        }}
        endAccessor={(event) => {
          return new Date(event.EndDate);
        }}
        style={{ height: 650 }}
        onSelectEvent={handleEventClick}
      />
      {showModal && selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-buttons-cancel" onClick={handleCloseModal}>
              X
            </button>
            <h2>{selectedEvent.Title}</h2>
        <ScheduleForm event={selectedEvent} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
