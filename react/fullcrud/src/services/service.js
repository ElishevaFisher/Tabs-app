import Http from "./http.js"
export const cardsDetail={
    async getCards(){
        try{
            const response=await Http.get('/cards')
            return response.data;
        }
        catch(error){
            console.error(error);
            return [];
        }
    },

    async updateCardColor(id,color){
        try{
            const response=await Http.patch(`/cards/${id}`, {background: color});
            return response.data;
        }catch(error){
            console.error("Error update card color:", error);
            throw error;
        }
    }
};
export default cardsDetail;