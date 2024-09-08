import axios from "../../uitl/axios"
// get Transaction
 export const getTransaction = async()=>{
    const response = await axios.get(`/transactions`);
    return response.data;
}
// create Operation
export const addTransaction = async(data)=>{
    const response = await axios.post(`/transactions`, data);
    return response.data;
}
// const editeTransaction
export const editTransaction = async(id,data)=>{
    const response = await axios.put(`/transactions/${id}`, data);
    return response.data;
}
// const edeleteTransaction
export const deleteTransaction = async(id)=>{
    const response = await axios.delete(`/transactions/${id}`);
    return response.data;
}