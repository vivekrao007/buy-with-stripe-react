import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default function StripeGateway({ amount }) {
  const API_URL =
    "http://localhost:5001/buy-with-stripe/us-central1/makePayment";
  //https://us-central1-buy-with-stripe.cloudfunctions.net/makePayment
  //http://localhost:5001/buy-with-stripe/us-central1/makePayment

  // capture token returned by stripe gateway and send to server for charging.
  function doPayment(token) {
    const body = {
      token,
      amount: amount,
    };
    stripePayment(body)
      .then((res) => {
        console.log("Res " + res);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }
  // this function makes api request to server for charging customer.
  function stripePayment(body) {
    return fetch(API_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "Allow",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <StripeCheckout
      name="make Payment"
      stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      token={doPayment}
      amount={amount}
      shippingAddress
      billingAddress
    >
      <button className="buy-button">Buy Now</button>
    </StripeCheckout>
  );
}
