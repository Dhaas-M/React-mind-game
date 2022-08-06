import './SingleCard.css';

const SingleCard = ({card, handleCard, flipped, disabled}) => {

  const handleClick  = () => {
    if(!disabled){
      handleCard(card)
    }
  }
  
    return ( 
        <div className="card" >
           <div className={flipped ? "flipped" : ""}> 
             <img src={card.src} alt="front-side" className="front" />
             <img 
                src="/img/cover.png" 
                alt="back-side" 
                className="back" 
                onClick={handleClick}
            />
           </div>
         </div>
     );
}
 
export default SingleCard;