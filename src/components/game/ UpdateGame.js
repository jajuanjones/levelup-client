import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getGameTypes, getGameById, updateGame } from './GameManager.js'


export const UpdateGame = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const [game, setUpdateGame] = useState({})
    const {gameId} = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: game.skill_level,
        numberOfPlayers: game.number_of_players,
        title: game.title,
        maker: game.maker,
        gameTypeId: game.game_type
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameById(gameId).then(data=>setUpdateGame(data))
        getGameTypes().then(data=>setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const newGame = Object.assign({}, currentGame)
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Player Count: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Difficulty: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="gameTypeId"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>

                        <option value="0">Select a Game Type</option>
                        {gameTypes.map(gameType => (
                            <option key={gameType.id} value={gameType.id}>
                                {gameType.label}
                            </option>
                        ))}
                    </select>  
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}