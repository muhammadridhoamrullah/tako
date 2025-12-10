import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function checkLogin() {
  if (!localStorage.accessToken) {
    return redirect("/login");
  }

  return null;
}

function preventLoginAccess() {
  if (localStorage.accessToken) {
    return redirect("/");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default router;
