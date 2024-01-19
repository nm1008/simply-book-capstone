import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";
import Swal from "sweetalert2";

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  //STATES
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  //SHOW PASSWORD
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const navigate = useNavigate();

  //AXIOS
  const data = {
    firstName: firstName,
    lastName: lastName,
    mobileNo: mobileNumber,
    email: email,
    password: password,
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      axios
        .post(
          `https://newback-simply-book.onrender.com/api/users`,
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(() => {
          Swal.fire({
            title: "Good job!",
            text: "Account was successfully registered.",
            icon: "success",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Uh oh!",
            text: "Account registration failed.",
            icon: "error",
          });
        });
    }
  };

  //SHOW PASSWORD TOGGLE
  const showPass1 = () => {
    setShowPassword1(!showPassword1);
  };

  const showPass2 = () => {
    setShowPassword2(!showPassword2);
  };

  const inputStyle =
    "bg-gray-50 border  border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  const labelStyle =
    "block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2";

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
              Create an account
            </h1>
            <form onSubmit={handleRegister}>
              <div className="flex gap-2 items-center justify-between">
                <div>
                  <label className={labelStyle}>First Name</label>
                  <input
                    type="text"
                    className={inputStyle}
                    placeholder="John"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyle}>Last Name</label>
                  <input
                    type="text"
                    className={`${inputStyle} mt-2`}
                    placeholder="Doe"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Email Address</label>
                <input
                  type="email"
                  className={inputStyle}
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <label className={labelStyle}>Password</label>
                <input
                  type={showPassword1 ? "text" : "password"}
                  className={inputStyle}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  title="Minimum of 7 characters. Should have at least one special character and one number."
                  pattern="(?=.*\d)(?=.*[\W_]).{7,}"
                  required
                />
                <div className="absolute top-9 right-3">
                  {showPassword1 ? (
                    <FontAwesomeIcon icon={faEye} onClick={showPass1} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} onClick={showPass1} />
                  )}
                </div>
              </div>
              <div className="relative">
                <label className={labelStyle}>Confirm Password</label>
                <input
                  type={showPassword2 ? "text" : "password"}
                  className={inputStyle}
                  placeholder="••••••••"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                  title="Minimum of 7 characters. Should have at least one special character and one number."
                  pattern="(?=.*\d)(?=.*[\W_]).{7,}"
                  required
                />
                <div className="absolute top-9 right-3">
                  {showPassword2 ? (
                    <FontAwesomeIcon icon={faEye} onClick={showPass2} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} onClick={showPass2} />
                  )}
                </div>
              </div>
              <div>
                <label className={labelStyle}>Phone Number</label>
                <input
                  type="number"
                  className={inputStyle}
                  placeholder="e.g. 8888-888-8888"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  maxLength={11}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-5 text-white bg-primary-600 bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-800 dark:text-gray-400 text-center mt-5">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
