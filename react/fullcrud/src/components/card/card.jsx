import cardsDetail from "../../services/service.js";
import { useEffect, useState } from "react";
import Style from "./card.module.css";
import ColorPicker from "../color/colorPicker.jsx";
import { BsTrash3 } from "react-icons/bs";
import {
  handleColorChange,
  handleDelete,
  handleAdd,
  handleEditClick,
  handleTextChange,
} from "../cardAction/cardAction";
function CardComponent() {
  const [cardData, setCardData] = useState([]);
  const [openPickerId, setOpenPickerId] = useState(null);
  const [isEditingId, setIsEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const fetchCard = await cardsDetail.getCards();
      setCardData(fetchCard);
      console.log("Fetched cards:", fetchCard);
    };
    fetchData();
  }, []);

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
          {isEditingId === card.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() =>
                handleTextChange(editText, card.id, setCardData, setIsEditingId)
              }
              autoFocus
            />
          ) : (
            <h3
              onClick={() =>
                handleEditClick(card.id, card.text, setIsEditingId, setEditText)
              }
            >
              {card.text}
            </h3>
          )}
          {openPickerId === card.id ? (
            <div className={Style.colorPickerContainer}>
              <ColorPicker
                onColorSelect={(color) =>
                  handleColorChange(
                    color,
                    card.id,
                    setCardData,
                    setOpenPickerId
                  )
                }
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
              onClick={() => handleDelete(card.id, setCardData)}
            />
          )}
        </div>
      ))}
      <div className={Style.addCard} onClick={() => handleAdd(setCardData)}>
        <h1>+</h1>
      </div>
    </div>
  );
}
export default CardComponent;
