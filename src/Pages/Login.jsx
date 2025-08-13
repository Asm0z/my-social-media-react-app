import registerLogo from "../assets/Sign up-logo.svg";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as Zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const schema = Zod.object({
  email: Zod.string()
    .nonempty("Email is Required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  password: Zod.string()
    .nonempty("Password is Required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password can't be less than eight characters with at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});
export default function Login() {
  let {getUserData} = useContext(UserContext)
  let Navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  async function handleLogin(value) {
    let response = await axios
      .post("https://linked-posts.routemisr.com/users/signin", value)
      .catch((err) => {
        toast.error(err.response.data.error);
      });
    if (response?.data?.message === "success") {
      localStorage.setItem("token", response.data.token);
      getUserData();
      toast.success("Logged in successfully");
      Navigate("/");
    }
  }
  return (
    <div className="md:grid md:grid-cols-2 md:gap-2">
      <div className="hidden md:block">
        <img src={registerLogo} alt="signup-logo" className="w-full" />
      </div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="md:w-3/4 w-full mx-auto"
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              {...register("email")}
              className="block py-2.5 px-0 w-full text-sm text-purple-900 bg-transparent border-0 border-b-2 border-purple-300 appearance-none dark:text-white dark:border-purple-600 dark:focus:border-purple-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-purple-500 dark:text-purple-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              {...register("password")}
              className="block py-2.5 px-0 w-full text-sm text-purple-900 bg-transparent border-0 border-b-2 border-purple-300 appearance-none dark:text-white dark:border-purple-600 dark:focus:border-purple-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-purple-500 dark:text-purple-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <h5 className="text-purple-500">
            Don't have an account?
            <NavLink
              to="/register"
              className=" dark:hover:text-white underline underline-offset-3 ps-1"
            >
              Register
            </NavLink>
          </h5>
          <button
            type="submit"
            className="mt-3 text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-purple-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
