import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import Signup from "./Signup";
import { Container } from "./Container";
import Shorten from "./Shorten";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {index: true, element: <Container />},
        {path: "login", element: <Login />},
        {path: "signup", element: <Signup />},
        {path: "shorten", element: <Shorten />}
      ]
    }
  ])

  return <RouterProvider router={router} />
}