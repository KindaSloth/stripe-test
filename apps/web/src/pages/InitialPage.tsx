import { Link } from "react-router-dom";

export const InitialPage = () => {
  return (
    <div>
      <h1>Stripe Test</h1>
      <Link to="/payment">Normal Payment test</Link>
      <br />
      <br />
      <Link to="/subscription">Subscription test</Link>
    </div>
  );
};
