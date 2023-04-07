import React, { useState, useEffect } from "react";
import moment from "moment";

const ScheduleForm = ({ event }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState(event);
  const handleEdit = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    setUpdatedEvent(event);
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items/${event.Id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;odata=verbose",
        },
        body: JSON.stringify(updatedEvent),
      }
    );
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Title:</td>
                <td>
                  <input
                    type="text"
                    name="Title"
                    value={updatedEvent.Title}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Location:</td>
                <td>
                  <input
                    type="text"
                    name="Location"
                    value={updatedEvent.Location}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Event Date:</td>
                <td>
                  <input
                    type="datetime-local"
                    name="EventDate"
                    value={
                      updatedEvent.EventDate
                        ? moment(updatedEvent.EventDate).format(
                            "YYYY-MM-DDTHH:mm"
                          )
                        : ""
                    }
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>End Date:</td>
                <td>
                  <input
                    type="datetime-local"
                    name="EndDate"
                    value={
                      updatedEvent.EndDate
                        ? moment(updatedEvent.EndDate).format(
                            "YYYY-MM-DDTHH:mm"
                          )
                        : ""
                    }
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Range:</td>
                <td>
                  <input
                    type="text"
                    name="Range"
                    value={updatedEvent.Range}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Contact DSN:</td>
                <td>
                  <input
                    type="text"
                    name="Contact_x0020_DSN"
                    value={updatedEvent.Contact_x0020_DSN}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Contact Name:</td>
                <td>
                  <input
                    type="text"
                    name="Contact_x0020_Name"
                    value={updatedEvent.Contact_x0020_Name}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Cal Title:</td>
                <td>
                  <input
                    type="text"
                    name="Cal_x0020_Title"
                    value={updatedEvent.Cal_x0020_Title}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Type of Threat:</td>
                <td>
                  <input
                    type="text"
                    name="Type_x0020_of_x0020_Threat"
                    value={updatedEvent.Type_x0020_of_x0020_Threat}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Threat_x002f_Equipment:</td>
                <td>
                  <input
                    type="text"
                    name="Threat_x002f_Equipment"
                    value={updatedEvent.Threat_x002f_Equipment}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Notes:</td>
                <td>
                  <input
                    type="text"
                    name="Notes"
                    value={updatedEvent.Notes}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>
                  <input
                    type="text"
                    name="Status"
                    value={updatedEvent.Status}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Threat Window:</td>
                <td>
                  <input
                    type="text"
                    name="Threat_x002f_Window"
                    value={updatedEvent.Threat_x002f_Window}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Modified:</td>
                <td>{moment(event.Modified).format("MMMM Do YYYY, h:mm a")}</td>
              </tr>
              <tr>
                <td>Created:</td>
                <td>{moment(event.Created).format("MMMM Do YYYY, h:mm a")}</td>
              </tr>
              <tr>
                <td>Author Id:</td>
                <td>{event.AuthorId}</td>
              </tr>
              <tr>
                <td>Editor Id:</td>
                <td>{event.EditorId}</td>
              </tr>
            </tbody>
          </table>

          <button type="submit">Submit</button>
          {isEditing && <button onClick={handleEdit}>close</button>}
        </form>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>Title:</td>
              <td>{event.Title}</td>
            </tr>
            <tr>
              <td>Location:</td>
              <td>{event.Location}</td>
            </tr>
            <tr>
              <td>Event Date:</td>
              <td>{moment(event.EventDate).format("MMMM Do YYYY, h:mm a")}</td>
            </tr>
            <tr>
              <td>End Date:</td>
              <td>{moment(event.EndDate).format("MMMM Do YYYY, h:mm a")}</td>
            </tr>
            <tr>
              <td>Range:</td>
              <td>{event.Range}</td>
            </tr>
            <tr>
              <td>Contact DSN:</td>
              <td>{event.Contact_x0020_DSN}</td>
            </tr>
            <tr>
              <td>Contact Name:</td>
              <td>{event.Contact_x0020_Name}</td>
            </tr>
            <tr>
              <td>Cal Title:</td>
              <td>{event.Cal_x0020_Title}</td>
            </tr>
            <tr>
              <td>Type of Threat:</td>
              <td>{event.Type_x0020_of_x0020_Threat || "N/A"}</td>
            </tr>
            <tr>
              <td>Threat Equipment:</td>
              <td>{event.Threat_x002f_Equipment}</td>
            </tr>
            <tr>
              <td>Notes:</td>
              <td>{event.Notes || "N/A"}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{event.Status || "N/A"}</td>
            </tr>
            <tr>
              <td>Threat Window:</td>
              <td>{event.Threat_x0020_Window || "N/A"}</td>
            </tr>
            <tr>
              <td>Modified:</td>
              <td>{moment(event.Modified).format("MMMM Do YYYY, h:mm a")}</td>
            </tr>
            <tr>
              <td>Created:</td>
              <td>{moment(event.Created).format("MMMM Do YYYY, h:mm a")}</td>
            </tr>
            <tr>
              <td>Author Id:</td>
              <td>{event.AuthorId}</td>
            </tr>
            <tr>
              <td>Editor Id:</td>
              <td>{event.EditorId}</td>
            </tr>
          </tbody>
        </table>
      )}
      {!isEditing && (
        <button className="modal-buttons-edit" onClick={handleEdit}>
          Edit
        </button>
      )}
    </div>
  );
};

export default ScheduleForm;
