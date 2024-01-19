import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";

import logo from "../../assets/logo.png";
import Button from "../../components/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  //AXIOS
  const data = {
    email: email,
    password: password,
  };

  const handleLogin = (e) => {
    e.preventDefault();

    //Checks the user input
    if (email === "" || password === "") {
      alert("Please input your email and/or password.");
    }
    axios
      .post(
        `https://newback-simply-book.onrender.com/api/users/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("token", res.data.accessToken);
          auth.login(res.data.accessToken);

          axios
            .post(
              `https://newback-simply-book.onrender.com/api/users/details`,
              { email: email },
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then((res) => {
              localStorage.setItem("isAdmin", res.data.isAdmin);
              localStorage.setItem("_id", res.data._id);
              Swal.fire({
                title: "Hooray!",
                text: "User has logged in successfully",
                icon: "success",
              });
              navigate("/courses");
            });
        } else {
          Swal.fire({
            title: "Uh oh!",
            text: "Please check your credentials",
            icon: "error",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="container mx-auto ">
      <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <a
          href="#"
          className="text-black flex items-center mb-6 text-2xl font-semibold dark:text-white"
        >
          <img className="w-8 h-8 mr-2 " src={logo} alt="logo" />
          Simply Book
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Sign in to your account
            </h1>
            <form action="" onSubmit={handleLogin}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  className="bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <Button>Sign in</Button>
              </div>
              <p className="text-sm font-light text-gray-800 dark:text-gray-400 text-center mt-5">
                Don&apos;t have an account yet?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
