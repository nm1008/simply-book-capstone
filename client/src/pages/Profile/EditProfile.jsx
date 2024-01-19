import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import axios from "axios";

export default function EditProfile() {
  //LOCAL STORAGE
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");
  const id = localStorage.getItem("_id");

  //STATES
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  //NAVIGATE
  const navigate = useNavigate();

  //AXIOS
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const data = {
    firstName: firstName,
    lastName: lastName,
    mobileNo: mobileNumber,
  };

  //GETTING THE DETAILS OF THE USER
  useEffect(() => {
    axios
      .get(
        `https://newback-simply-book.onrender.com/api/users/${id}`
      )
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setMobileNumber(res.data.mobileNo);
      });
  }, [id]);

  const handleEditUser = async (e) => {
    e.preventDefault();
    axios
      .put(
        `https://newback-simply-book.onrender.com/api/users/${id}`,
        data,
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "Good job!",
            text: "You have successfully edited your profile",
            icon: "success",
          });
          setFirstName("");
          setLastName("");
          setMobileNumber("");
          navigate("/ProfilePage");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {isAdmin === "true" ? (
        <h1>This feature is not available</h1>
      ) : (
        <section className="container mx-auto ">
          <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
            <a
              href="#"
              className="text-black flex items-center mb-6 text-2xl font-semibold dark:text-white"
            >
              Edit Profile
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form action="" onSubmit={handleEditUser}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      First name
                    </label>
                    <input
                      type="text"
                      className="mb-5 bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      maxLength={30}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      className="bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-5 justify-center ">
                    <Button>Submit</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
