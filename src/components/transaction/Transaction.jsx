import editImage from "../../assets/edit.svg";
import deleteImage from "../../assets/delete.svg";
import { useDispatch } from "react-redux";
import { activeEditing, removeTransaction } from "../../features/Transation/transactionSlice";
const Transaction = ({ data, id }) => {

  const dispatch = useDispatch();
  // handelDelete
  const handelDelete = (id) => {
    dispatch(removeTransaction(id));
  };
// handel Edit
  const handelEdit = () =>{
  
    dispatch(activeEditing(data))
         
        }
  return (
    <div>
      <li
        className={`transaction ${
          data.type === "income" ? "income" : "expense"
        }`}
      >
        <p>{data.name}</p>
        <div className="right">
          <p>৳ {data.amount}</p>
          <button onClick={handelEdit} className="link">
            <img className="icon" src={editImage} />
          </button>
          <button onClick={() => handelDelete(id)} className="link">
            <img className="icon" src={deleteImage} />
          </button>
        </div>
      </li>
    </div>
  );
};

export default Transaction;
