import React, { useState, useEffect } from 'react'
import './Game.css'

export default function Game() {

   const [gridSize,setGridSize] = useState(4)
   const [cards,setCards] = useState([])

   const [isFlipped,setIsFlipped] = useState([])
   const [solved,setSolved] = useState([])
   const [disabled,setDisabled] = useState(false)
   const [won,setWon] = useState(false)

   const handleGridSizeChange = (e) => {
    let size = parseInt(e.target.value)
    if (e.target.value === '') {
        setGridSize('')
        return
    }
    if (size < 2) size = 2
    if (size > 10) size = 10
    setGridSize(size)
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

   const checkMatch = (secondId)=>
   {
      const firstId = isFlipped[0];
      if(cards[firstId].number === cards[secondId].number)
      {
        setSolved([...solved,firstId,secondId]);
        setIsFlipped([]);
        setDisabled(false)
      }
      else
      {
        setTimeout(()=>{
            setIsFlipped([]);
            setDisabled(false);
        },1000);
      }
   }

    const handleClick = (id) => {
        if(disabled || solved.includes(id) || won) return;

        if(isFlipped.length === 0)
        {
            setIsFlipped([id])
            return;
        }

        if(isFlipped.length===1)
        {
            setDisabled(true);
            if(id!==isFlipped[0])
            {
                setIsFlipped([...isFlipped,id]);
                checkMatch(id);
            }
            else
            {
                setIsFlipped([]);
                setDisabled(false);
            }
        }
   }    

   useEffect(()=>{
    if (gridSize) {
        initializeGrid()
    }
   },[gridSize])

   useEffect(()=>{
    if(solved.length === cards.length && cards.length > 0)
    {
        setWon(true);
    }
   },[solved, cards])

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

          <div className="game-grid" style={{ gridTemplateColumns: `repeat(${gridSize || 2}, 1fr)` }}>
            {cards.map((card) => (
                <div 
                    key={card.id} 
                    onClick={() => handleClick(card.id)}
                    className={`card ${isFlipped.includes(card.id) ? 'flipped' : ''} ${solved.includes(card.id) ? 'solved' : ''}`}
                >
                    <div className="card-inner">
                        {isFlipped.includes(card.id) || solved.includes(card.id) ? card.number : '?'}
                    </div>
                </div>
            ))}
          </div>

          {won && <div className="win-message">Congratulations! You've won!</div>}
          
          <button className="reset-button" onClick={initializeGrid}>
            {won ? "Play Again" : "Reset Game"}
          </button>
    </div>
  )
}
