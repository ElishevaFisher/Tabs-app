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
    }
}
export default cardsDetail;