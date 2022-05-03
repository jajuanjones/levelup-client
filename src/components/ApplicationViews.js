import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./event/EventList"
import { EventForm } from "./event/EventForm"
import { GameForm } from "./game/GameForm"
import { UpdateGame } from "./game/ UpdateGame"
import { GameList } from "./game/GameList"

export const ApplicationViews = () => {
    return <>
        <Route exact path="/games">
            <GameList/>
        </Route>
        <Route exact path="/games/new">
            <GameForm/>
        </Route>
        <Route exact path="/games/edit/:gameId(/+d)">
            <UpdateGame/>
        </Route>
        <Route exact path="/events">
            <EventList/>
        </Route>
        <Route exact path="/events/new">
            <EventForm/>
        </Route>
    </>
}
