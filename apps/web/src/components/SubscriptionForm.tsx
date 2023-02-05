import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSub = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const card = elements.getElement(CardElement);

    if (!card) return;

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email: email,
      },
    });

    if (!paymentMethod || error) return;

    const res = await fetch("http://localhost:3000/sub", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        payment_method: paymentMethod.id,
      }),
    }).then((res) => res.json());

    if (res.error) {
      console.log(res.error);

      return;
    }

    const { client_secret, status } = res;

    if (status === "requires_action") {
      stripe.confirmCardPayment(client_secret).then(function (result) {
        if (result.error) {
          console.log("There was an issue!");
          console.log(result.error);

          setIsLoading(false);

          return;
        } else {
          console.log("You got the money!");

          setIsLoading(false);

          return;
        }
      });
    } else {
      console.log("You got the money!");

      setIsLoading(false);

      return;
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <br />
      <br />
      <CardElement />
      <br />
      <button onClick={() => handleSub()} disabled={isLoading}>
        Subscribe
      </button>
    </div>
  );
};
