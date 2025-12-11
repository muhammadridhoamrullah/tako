import { Link, useLocation } from "react-router-dom";

export default function NonAuthNavbar() {
  const path = useLocation().pathname;

  function isActive(pathname) {
    return path === pathname
      ? "border-b-2 border-b-white"
      : "border-b-2 border-b-transparent text-gray-400";
  }

  return (
    <div className="w-[700px] h-fit flex flex-col gap-2 justify-start items-center font-semibold">
      {/* Awal Logo Tako */}
      <div className="w-28 h-20 relative">
        <img
          src={"/image/sbubu-logo.png"}
          alt="Logo Tako"
          className="w-full h-full absolute"
        />
      </div>
      {/* Akhir Logo Tako */}
      {/* Awal List Menu Navbar */}
      <div className="w-full h-16 flex justify-around items-center border-b border-b-gray-700">
        {/* Awal Menu Login */}
        <Link
          to={"/auth/login"}
          className={`w-full h-full flex justify-center items-center ${isActive(
            "/auth/login"
          )} transition-all duration-700`}
        >
          Masuk
        </Link>
        {/* Akhir Menu Login */}
        {/* Awal Menu Register */}
        <Link
          to={"/auth/register"}
          className={`w-full h-full flex justify-center items-center ${isActive(
            "/auth/register"
          )} transition-all duration-700`}
        >
          Buat Akun
        </Link>
        {/* Akhir Menu Register */}
        {/* Awal Lupa Password */}
        <Link
          to={"/auth/lupa-password"}
          className={`w-full h-full flex justify-center items-center ${isActive(
            "/auth/lupa-password"
          )} transition-all duration-700`}
        >
          Lupa Password
        </Link>
        {/* Akhir Lupa Password */}
        {/* Awal Kirim Ulang Verifikasi */}
        <Link
          to={"/auth/kirim-ulang-verifikasi"}
          className={`w-full h-full flex justify-center items-center ${isActive(
            "/auth/kirim-ulang-verifikasi"
          )} transition-all duration-700`}
        >
          Kirim Ulang Verifikasi
        </Link>
        {/* Akhir Kirim Ulang Verifikasi */}
      </div>
      {/* Akhir List Menu Navbar */}
    </div>
  );
}
