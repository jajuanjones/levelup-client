export const getAllEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res => res.json())
}

export const getEventById = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res => res.json())
}

export const createEvent = (newEvent) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
    })
        .then(res => res.json())
}

export const updateEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
    })
}

export const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
}

export const leaveEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}/leave`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })  
}

export const joinEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}/signup`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        }
    })  
}