import Game from './App.jsx'
import './css/startPage.css'
import { useState } from 'react'

export default function StartPage() {
    const [start, setStart] = useState(false)
    function handleStart(value) { setStart(value) }
    const display = start ? <Game handleStart={handleStart}/> : <StartPageDisplay handleStart={handleStart} />
    return display

}   

function StartPageDisplay({ handleStart }) {
    return (
        <div className="start-page-container">
            <h1> Tic-Tac-Toe </h1>
            <p>Ready to challenge a friend?</p>
            <button className="start-button" onClick={() => handleStart(true)}>
                Start Game
            </button>
        </div>
    )
}
