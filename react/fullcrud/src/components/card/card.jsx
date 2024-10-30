import cardsDetail from "../../services/service.js";
import { useEffect, useState } from "react";
import Style from "./card.module.css";
import ColorPicker from "../color/colorPicker.jsx";
import { BsTrash3 } from "react-icons/bs";

function CardComponent() {
  const [cardData, setCardData] = useState([]);
  const [openPickerId, setOpenPickerId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchCard = await cardsDetail.getCards();
      setCardData(fetchCard);
    };
    fetchData();
  }, []);

  const handleColorChange = async (color, id) => {
    try {
      await cardsDetail.updateCardColor(id, color);
      setCardData((prevCardData) =>
        prevCardData.map((card) =>
          card.id === id ? { ...card, background: color } : card
        )
      );
      setOpenPickerId(null);
    } catch (error) {
      console.error("Error update card color:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await cardsDetail.deleteCard(id);
      setCardData((prevCardData) =>
        prevCardData.filter((card) => card.id !== id)
      );
    } catch (error) {
      console.error("Error delet card:", error);
    }
  };

  const handleAdd = async () => {
    const cardData = {
      text: "new card",
      background: "green",
    };
    try {
      const addedCard=await cardsDetail.addCard(cardData);
        setCardData((prevCardData)=>[...prevCardData,addedCard]);
    } catch (error) {
      console.error("Error add card:", error);
    }
  };

  const toggleColorPicker = (id) => {
    setOpenPickerId(openPickerId === id ? null : id);
  };

  return (
    <div className={Style.cardContainer}>
      {cardData.map((card) => (
        <div
          key={card.id}
          className={Style.card}
          style={{ backgroundColor: card.background }}
          onMouseLeave={() => setOpenPickerId(null)}
        >
          <h3>{card.text}</h3>
          {openPickerId === card.id ? (
            <div className={Style.colorPickerContainer}>
              <ColorPicker
                onColorSelect={(color) => handleColorChange(color, card.id)}
              />
            </div>
          ) : (
            <div
              className={Style.colorCircle}
              onClick={() => toggleColorPicker(card.id)}
              onMouseEnter={() => toggleColorPicker(card.id)}
              onMouseLeave={() => setOpenPickerId(null)}
            />
          )}
          {openPickerId !== card.id && (
            <BsTrash3
              className={Style.trashIcon}
              onClick={() => handleDelete(card.id)}
            />
          )}
        </div>
      ))}
      <div className={Style.addCard} onClick={handleAdd}>
        <h1>+</h1>
      </div>
    </div>
  );
}
export default CardComponent;
