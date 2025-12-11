import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NonAuthLayout from "./layout/nonAuthLayout/NonAuthLayout";
import Login from "./pages/(Non-Auth)/Login";

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
  {
    path: "/auth",
    element: <NonAuthLayout />,
    loader: preventLoginAccess,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <h1>Hai Register</h1>,
      },
      {
        path: "lupa-password",
        element: <h1>Hai Lupa Password</h1>,
      },
      {
        path: "kirim-ulang-verifikasi",
        element: <h1>Hai Kirim Ulang Verifikasi</h1>,
      },
    ],
  },
]);

export default router;
