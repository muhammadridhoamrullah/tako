import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogin, resetLoginState } from "../../store/loginSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Login() {
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, data, loggedIn } = useSelector(
    (state) => state.login
  );
  const [formLogin, setFormLogin] = useState({
    identifier: "",
    password: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (!formLogin.identifier || !formLogin.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    dispatch(doLogin(formLogin));
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function hideForm() {
    setHide(!hide);
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      setFormLogin({ identifier: "", password: "" });
      dispatch(resetLoginState());
    }

    if (loggedIn) {
      toast.success("Login Successful");
      navigate("/");
    }
  }, [error, loggedIn]);
  const isFormValid = formLogin.identifier && formLogin.password;
  return (
    <div
      className={`bg-gray-900/50 w-[700px]  h-fit rounded-2xl overflow-hidden flex flex-col  justify-start items-start ${
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
        <form
          onSubmit={submitHandler}
          className=" w-full h-full p-4 flex flex-col gap-2 font-semibold"
        >
          {/* Awal Identifier */}
          <div className="w-full h-fit flex flex-col gap-2">
            {/* Awal Judul Identifier */}
            <label htmlFor="identifier" className="">
              Email / Username <span className="text-red-500">*</span>
            </label>
            {/* Akhir Judul Identifier */}
            {/* Awal Input Identifier */}
            <input
              type="text"
              name="identifier"
              id="identifier"
              className="p-2 w-full h-12 outline-none rounded-md bg-gray-800"
              placeholder="dewaberasgerlong@gmail.com"
              onChange={changeHandler}
              value={formLogin.identifier}
              required
            />
            {/* Akhir Input Identifier */}
          </div>
          {/* Akhir Identifier */}
          {/* Awal Password */}
          <div className="w-full h-fit flex flex-col gap-2">
            {/* Awal Judul Password */}
            <label htmlFor="password" className="">
              Password <span className="text-red-500">*</span>
            </label>
            {/* Akhir Judul Password */}
            {/* Awal Input Password */}
            <div className="w-full h-fit relative">
              {/* Awal Input Password */}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="*********"
                className="p-2 w-full h-12 outline-none rounded-md bg-gray-800"
                onChange={changeHandler}
                value={formLogin.password}
                required
              />
              {/* Akhir Input Password */}

              {/* Awal Button Show Password */}
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute top-1/2 right-3 -translate-y-1/2  hover:text-gray-200 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEye className="text-xl" />
                ) : (
                  <AiOutlineEyeInvisible className="text-xl" />
                )}
              </button>
              {/* Awal Button Show Password */}
            </div>
            {/* Akhir Input Password */}
          </div>
          {/* Akhir Password */}

          {/* Awal Lupa Password */}
          <Link className="text-end text-sm text-gray-400 hover:text-white">
            Lupa Password?
          </Link>
          {/* Akhir Lupa Password */}

          {/* Awal Button Login */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`bg-blue-800 hover:bg-blue-950 cursor-pointer text-xl h-14 rounded-md disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-500 transition-all duration-1000 `}
          >
            {loading ? "LOADING..." : "LOGIN"}
          </button>
          {/* Akhir Button Login */}
        </form>
        {/* Akhir Form */}
      </div>
    </div>
  );
}
