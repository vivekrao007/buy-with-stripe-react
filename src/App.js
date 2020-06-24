import React, { useState } from "react";
import "./App.css";
import StripeGateway from "./PaymentGayeway/stripeGateway";

function App() {
  // amount to be charged.
  const [amount, setAmount] = useState(100);

  return (
    <div className="container">
      <div>
        <h2>Total Amount : ${amount} </h2>
      </div>
      <div>
        <StripeGateway amount={amount}></StripeGateway>
      </div>
    </div>
  );
}

export default App;
