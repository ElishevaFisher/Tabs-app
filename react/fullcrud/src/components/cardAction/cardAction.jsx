// import cardsDetail from "../../services/service.js";

// const handleColorChange = async (color, id) => {
//   try {
//     await cardsDetail.updateCardColor(id, color);
//     setCardData((prevCardData) =>
//       prevCardData.map((card) =>
//         card.id === id ? { ...card, background: color } : card
//       )
//     );
//     setOpenPickerId(null);
//   } catch (error) {
//     console.error("Error update card color:", error);
//   }
// };

// const handleDelete = async (id) => {
//   try {
//     await cardsDetail.deleteCard(id);
//     setCardData((prevCardData) =>
//       prevCardData.filter((card) => card.id !== id)
//     );
//   } catch (error) {
//     console.error("Error delet card:", error);
//   }
// };

//   const handeleAdd=async()=>{
//       try{
//           await cardsDetail.addCard();
//       }catch(error){
//           console.error("Error add card:", error);
//       }
//   }
