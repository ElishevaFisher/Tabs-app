import Http from "./http.js";
export const cardsDetail = {
  async getCards() {
    try {
      const response = await Http.get("/cards");
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async updateCardColor(id, color) {
    try {
      const response = await Http.patch(`/cards/${id}`, { background: color });
      return response.data;
    } catch (error) {
      console.error("Error update card color:", error);
      throw error;
    }
  },

  async deleteCard(id) {
    try {
      const response = await Http.delete(`/cards/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error delete card", error);
      throw error;
    }
  },
  async addCard(cardData) {
    try {
      const response = await Http.post(`/cards`, cardData);
      return response.data;
    } catch (error) {
      console.error("Error add card", error);
      throw error;
    }
  },
  async updateText(id, newText) {
    try {
      const response = await Http.patch(`/cards/${id}`, { text: newText });
      return response.data;
    } catch (error) {
      console.error("Error update card text:", error);
      throw error;
    }
  },
};
export default cardsDetail;
