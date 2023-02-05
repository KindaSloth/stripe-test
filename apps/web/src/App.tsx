import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { InitialPage } from "./pages/InitialPage";
import { NormalPayment } from "./pages/NormalPayment";
import { Subscription } from "./pages/Subscription";
import { SuccessPage } from "./pages/SuccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <InitialPage />,
  },
  {
    path: "/payment",
    element: <NormalPayment />,
  },
  {
    path: "/subscription",
    element: <Subscription />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
