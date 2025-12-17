import { Outlet } from "react-router-dom";
import NonAuthNavbar from "./NonAuthNavbar";

export default function NonAuthLayout() {
  return (
    <div className="bg-black w-full min-h-screen text-white flex flex-col gap-4 justify-start items-center py-10">
      <NonAuthNavbar />
      <Outlet />
      <div>Footer</div>
    </div>
  );
}
