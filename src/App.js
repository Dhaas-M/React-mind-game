import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';


const cardImages = [
  { "src": "/img/helmet-1.png", matched:false },
  { "src": "/img/potion-1.png", matched:false },
  { "src": "/img/ring-1.png", matched:false },
  { "src": "/img/scroll-1.png", matched:false },
  { "src": "/img/shield-1.png", matched:false },
  { "src": "/img/sword-1.png", matched:false }
]

function App() {

    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const handleCard = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    };

    useEffect(() => {
        if (choiceOne && choiceTwo){
          setDisabled(true);
          if (choiceOne.src===choiceTwo.src){
              setCards(prevCards => {
                return prevCards.map(card => {
                  if(card.src === choiceTwo.src){
                    return {...card, matched:true}
                  } else{
                    return card
                  }
                })
              })
              setTimeout( () => resetTurn(), 1000);
          }
          else{
            setTimeout( () => resetTurn(), 1000);
          }
        }
    }, [choiceOne, choiceTwo])

    useEffect( () => { 
         shuffleCards()
         setChoiceOne(null)
         setChoiceTwo(null)
     },[])

    const resetTurn = () =>{
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns+1)
      setDisabled(false)
    }


   const shuffleCards = () =>{

    const shuffledCards = [...cardImages, ...cardImages]
          .sort( () =>Math.random()-0.5 )
          .map( (card) => ({ ...card, id:Math.random()}))

          setCards(shuffledCards)
          setTurns(0)
   }



  return (
    <div className="App">
     <h1>Magic Match</h1>
     <button onClick={ shuffleCards }>New Game</button>
     <div className="card-grid">
       { cards.map( card=> (
         <SingleCard 
            key = {card.id} 
            card = {card} 
            handleCard = {handleCard}
            flipped = { card === choiceOne || card === choiceTwo || card.matched }
            disabled = {disabled}
          />
       ))}
     </div>
     <p>Turns: {turns} </p>
    </div>
  );
}

export default App;
