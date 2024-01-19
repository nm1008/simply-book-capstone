import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Swal from "sweetalert2";

const isAdmin = localStorage.getItem("isAdmin");
const token = localStorage.getItem("token");

export default function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleAddCourse = (e) => {
    e.preventDefault();
    try {
      fetch(`https://newback-simply-book.onrender.com/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: courseName,
          price: price,
          description: description,
        }),
      }).then((res) => {
        if (res.ok) {
          Swal.fire({
            title: "Good job!",
            text: "You have successfully added a course",
            icon: "success",
          });
          navigate("/courses");
        } else {
          alert("Please check the input fields");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isAdmin === "true" ? (
        <section className="container mx-auto ">
          <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
            <h1 className="text-black flex items-center mb-6 text-2xl font-semibold dark:text-white">
              Add a course
            </h1>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form action="" onSubmit={handleAddCourse}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Title
                    </label>
                    <input
                      type="text"
                      className="mb-5 bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Javascript"
                      onChange={(e) => setCourseName(e.target.value)}
                      maxLength={30}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Description
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="JavaScript is a versatile programming language."
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Price
                    </label>
                    <input
                      type="number"
                      className="bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="69"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-5 justify-center ">
                    <Button>Create course</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h1>Not available</h1>
      )}
    </>
  );
}
