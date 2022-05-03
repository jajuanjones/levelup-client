import { useState, useEffect } from "react";
import { deleteEvent, getAllEvents, leaveEvent, joinEvent } from "./EventManger";
import { useHistory } from "react-router-dom";
import "./EventList.css"

export const EventList = () => {
    const [events, updateEvents] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getAllEvents()
                .then(data=>updateEvents(data))
        },[]
    )

    const onClickDelete = (id) => {
        deleteEvent(id).then(getAllEvents).then(data=>updateEvents(data))
    }

    const onClickJoin = (id) => {
        joinEvent(id).then(getAllEvents).then(data=>updateEvents(data))
    }
    
    const onClickLeave = (id) => {
        leaveEvent(id).then(getAllEvents).then(data=>updateEvents(data))
    }

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                                <div className="event_game">{event.game.title}</div>
                                <div className="event_description">{event.description}</div>
                                <div className="event_organizer">Organized by {event.organizer.user}</div>
                                <div className="event_datetime">On {event.date} at {event.time}</div>
                                <button className="edit__button" onClick={()=>history.push(`/events/edit/${event.id}`)}>Edit</button>
                                <button className="delete__button" onClick={()=>{onClickDelete(event.id)}}>Delete</button>
                                {
                                    event.joined ?
                                    <button className="leave_button" onClick={()=>onClickLeave(event.id)}>Leave</button> :
                                    <button className="join_button" onClick={()=>onClickJoin(event.id)}>Join</button>
                                }
                            </section>
                })
            }
        </article>
    )
}