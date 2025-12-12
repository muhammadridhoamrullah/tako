import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function Login() {
  const [hide, setHide] = useState(false);

  function hideForm() {
    setHide(!hide);
  }

  return (
    <div
      className={`bg-gray-900/50 w-[700px] h-fit rounded-2xl overflow-hidden flex flex-col  justify-start items-start ${
        hide ? "gap-0" : "gap-2"
      }`}
    >
      {/* Awal Judul Login */}
      <div className="bg-gray-900 w-full h-full p-4 flex justify-between items-center text-xl">
        {/* Awal Masuk ke akunmu */}
        <div className="font-bold ">Masuk ke akunmu</div>
        {/* Akhir Masuk ke akunmu */}
        {/* Awal Arrow */}
        <div className="cursor-pointer" onClick={hideForm}>
          {hide ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
        {/* Akhir Arrow */}
      </div>
      {/* Akhir Judul Login */}

      <div
        className={`w-full h-full  flex flex-col gap-2 transition-all duration-500 ease-in-out overflow-hidden ${
          hide ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100"
        }`}
      >
        {/* Awal Logo Tako */}
        <div className="w-full h-full px-4 flex flex-col gap-2 justify-start items-center">
          {/* Awal Logo */}
          <div className="w-32 h-24 relative">
            <img
              src={"/image/sbubu-logo.png"}
              alt="Logo Tako"
              className="w-full h-full absolute rounded-full"
            />
          </div>
          {/* Akhir Logo */}
          {/* Awal Masuk Ke Akunmu */}
          <div className="text-4xl font-bold">Masuk Ke Akunmu</div>
          {/* Akhir Masuk Ke Akunmu */}
        </div>
        {/* Akhir Logo Tako */}
        {/* Awal Form */}
        <div className="bg-green-900 w-full h-full p-4">Form 2</div>
        {/* Akhir Form */}
      </div>
    </div>
  );
}
