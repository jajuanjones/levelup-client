import { useState, useEffect } from "react";
import { deleteGame, getAllGames } from "./GameManager";
import { useHistory } from "react-router-dom";
import "./GameList.css"

export const GameList = () => {
    const [games, updateGames] = useState([])
    const [game, setGame] = useState({})
    const history = useHistory()

    useEffect(
        () => {
            getAllGames()
                .then(data=>updateGames(data))
        },[]
    )

    const onClickDelete = (id) => {
        deleteGame(id).then(getAllGames).then(data=>updateGames(data))
    }

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                                <div className="game__title">{game.title} by {game.maker}</div>
                                <div className="game__players">{game.number_of_players} players needed</div>
                                <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                                <button className="edit__button" onClick={()=>history.push(`/games/edit/${game.id}`)}>Edit</button>
                                <button className="delete__button" onClick={()=>{onClickDelete(game.id)}}>Delete</button>
                            </section>
                })
            }
        </article>
    )
}