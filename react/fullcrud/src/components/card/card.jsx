import cardsDetail from "../../services/service.js";
import { useEffect,useState } from "react";
import Style from "./card.module.css";

function CardComponent(){
    const [cardData, setCardData]= useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const fetchCard=await cardsDetail.getCards();
            setCardData(fetchCard);
        };
        fetchData();
    },[]);
    return(
        <div className={Style.cardContainer}>
            {
                cardData.map((card)=>(
                    <div key={card.id} className={Style.card} style={{backgroundColor: card.background}}>
                        <h3>{card.text}</h3>
                    </div>
                ))
            }

        </div>
    );
}
export default CardComponent;