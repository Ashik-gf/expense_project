import LayOut from "./components/Layout/LayOut";
import Balance from "./components/balance/Balance";
import Form from "./components/form/Form";
import Transactions from "./components/transactions/Transactions";

function App() {
    return (
       <LayOut>
        <Balance />
        <Form />
        <Transactions />
       </LayOut>
    );
}

export default App;
