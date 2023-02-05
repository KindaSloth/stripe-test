import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { SubscriptionForm } from "../components/SubscriptionForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const Subscription = () => (
  <Elements stripe={stripePromise}>
    <SubscriptionForm />
  </Elements>
);
