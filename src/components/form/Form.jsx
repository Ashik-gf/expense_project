import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTransaction, createTransaction } from "../../features/Transation/transactionSlice";

const Form = () => {
const [name, setName ] = useState('');
const [type, setType ] = useState('');
const [amount, setAmount] = useState('');
const [editingMode, setEditingMode ] = useState(false)
const dispatch = useDispatch();
// for error handeling 
const {isLoading, isError} = useSelector(state=>state.transactions)
const {editing}= useSelector(state=>state.transactions)

useEffect(()=>{
  const {id, name, type, amount}= editing;
if(id){
  setEditingMode(true)
  setName(name)
  setType(type)
  setAmount(amount)

}else{
  setEditingMode(false);
  resetFrom() 
}
},[editing])
// handelUpdate 
const handleUpdate =()=>{
  dispatch(changeTransaction({
    id: editing?.id,
    data:{
      name: name,
      amount : amount,
      type: type
    }
  }))
  resetFrom()
}
// set Edit mode
const handelCancel =()=>{
  setEditingMode(false);
  resetFrom();
}

// for reset from 
const resetFrom =()=>{
    setName('')
    setType('')
    setAmount('')
}
// handel Create
const handelCreate =(e)=>{
e.preventDefault();
dispatch(createTransaction({
    name,
    type,
    // for sent amount as a number
    amount: Number(amount)
}))
resetFrom();
}



  return (
    <div className="form">
      <h3>Add new transaction</h3>
<form onSubmit={ editingMode ? handleUpdate : handelCreate}>
      <div className="form-group">
        <label >Name</label>
        <input type="text"
         name="name" 
         value={name} 
         required
         placeholder="input Title"
         onChange={(e)=>setName(e.target.value)} />
      </div>

      <div className="form-group radio">
        <label >Type</label>
        <div className="radio_group">
          <input 
          type="radio" 
          required
          value="income"
           name="type" 
           checked ={type === "income"}
           onChange={(e)=>setType(e.target.value)}
           />
          
          <label >Income</label>
        </div>
        <div className="radio_group">
          <input
            type="radio"
            required
            value="expense"
            name="type"
            placeholder="Expense"
            checked ={type === "expense"}
           onChange={(e)=>setType(e.target.value)}
          />
          <label >Expense</label>
        </div>
      </div>

      <div className="form-group">
        <label >Amount</label>
        <input 
        type="number"
         name="amount" 
         required
         value={amount} 
         placeholder="Enter Amount"
         onChange={(e)=>setAmount(e.target.value)} />
      </div>

      <button disabled={isLoading} type="submit" className="btn">{ editingMode ? "Update Transaction" :"Add Transaction" }</button>
      {!isLoading && isError && (<p>There is an Error</p>)}
      </form>
      {editingMode && <button onClick={handelCancel}  className="btn cancel_edit">Cancel Edit</button> }
      
    </div>
  );
};

export default Form;
