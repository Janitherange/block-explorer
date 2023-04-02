import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Address from "./components/Address";
import Block from "./components/Block";
import TransactionHash from "./components/TransactionHash";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/address/:id" element={<Address />} />
      <Route path="/block/:id" element={<Block />} />
      <Route path="/transactionHash/:id" element={<TransactionHash />} />
    </Routes>
  );
}

export default App;
