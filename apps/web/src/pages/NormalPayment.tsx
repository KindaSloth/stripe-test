import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "../components/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const NormalPayment = () => {
  const [clientSecret, setClientSecret] = useState("");

  const createPaymentIntent = () => {
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  };

  return (
    <div className="App">
      <button onClick={() => createPaymentIntent()}>
        Create payment intent
      </button>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance: { theme: "stripe" } }}
          stripe={stripePromise}
        >
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
};
