import cardsDetail from "../../services/service.js";
import { generateUniqueID } from "../../utils/utils.js";

export const handleColorChange = async (
  color,
  id,
  setCardData,
  setOpenPickerId
) => {
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

export const handleDelete = async (id, setCardData) => {
  try {
    await cardsDetail.deleteCard(id);
    setCardData((prevCardData) =>
      prevCardData.filter((card) => card.id !== id)
    );
  } catch (error) {
    console.error("Error delet card:", error);
  }
};

export const handleAdd = async (setCardData) => {
  const cardData = {
    id: generateUniqueID(),
    text: "new card",
    background: "green",
  };
  try {
    const addedCard = await cardsDetail.addCard(cardData);
    setCardData((prevCardData) => [...prevCardData, addedCard]);
  } catch (error) {
    console.error("Error add card:", error);
  }
};

export const handleEditClick = (
  id,
  currentText,
  setIsEditingId,
  setEditText
) => {
  setIsEditingId(id);
  setEditText(currentText);
};

export const handleTextChange = async (
  text,
  id,
  setCardData,
  setIsEditingId
) => {
  try {
    await cardsDetail.updateText(id, text);
    setCardData((prevCardData) =>
      prevCardData.map((card) =>
        card.id === id ? { ...card, text: text } : card
      )
    );
    setIsEditingId(null);
  } catch (error) {
    console.error("Error update card text:", error);
  }
};
