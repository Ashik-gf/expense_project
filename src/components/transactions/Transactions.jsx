import React, { useEffect } from "react";

import Transaction from "../transaction/Transaction";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../../features/Transation/transactionSlice";
const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, isloading, isError, error } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransaction());
  },[dispatch]);
  // what i want to show
  let content 
  if(isloading){content = <h1>Loading...</h1>}
  if(!isloading && isError){
    content = <p> some Error </p>
  }
  if(!isloading && !isError && transactions?.length === 0){
    content = <p> No video Found </p>
  }
  if(!isloading && !isError && transactions?.length > 0){
    content = transactions.map(data=> <Transaction data={data} id={data.id} />)
  }

  return (
    <div>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>
         {content}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
