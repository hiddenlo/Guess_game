import React, { useState, useEffect } from 'react'
import './Game.css'

export default function Game() {

   const [gridSize,setGridSize] = useState([])
   const [cards,setCards] = useState([])

   const [isFlipped,setIsFlipped] = useState([])
   const [solved,setSolved] = useState([])
   const [disabled,setDisabled] = useState(false)
   const [won,setWon] = useState(false)

   const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value)
    if(size >= 2 && size <= 10){
        setGridSize(size)
    }
   }


   const initializeGrid = () => 
    {

    const totalCards = gridSize*gridSize;
    const pairs = Math.floor(totalCards/2);

    const numbers = [...Array(pairs).keys()].map(i=>i+1);
    const shuffledCards = [...numbers,...numbers]
    .sort(()=>Math.random()-0.5)
    .slice(0,totalCards)
    .map((number,index)=>({id:index, number}));

    setCards(shuffledCards);
    setIsFlipped([]);
    setSolved([]);
    setWon(false);
   }
   
   useEffect(()=>{
    initializeGrid()
   },[gridSize])

  return (
    <div className="game-container">
          <div className="controls">
            <label htmlFor="inputGrid">Grid Size: </label>
            <input 
              type="number" 
              min="2" 
              max="10" 
              id="inputGrid" 
              className="grid-input"
              value={gridSize} 
              onChange={handleGridSizeChange}
            />
          </div>
          
          <div className="game-grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
            {cards.map((card) => (
                <div 
                    key={card.id} 
                    className={`card ${isFlipped.includes(card.id) ? 'flipped' : ''} ${solved.includes(card.id) ? 'solved' : ''}`}
                >
                    <div className="card-inner">
                        <div className="card-front"></div>
                        <div className="card-back">{card.number}</div>
                    </div>
                </div>
            ))}
          </div>

          {won && <div className="win-message">Congratulations! You've won!</div>}
          
          <button className="reset-button" onClick={initializeGrid}>
            {won ? 'Play Again' : 'Reset Game'}
          </button>
    </div>
  )
}
