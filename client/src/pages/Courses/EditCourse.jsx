import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/Button";

const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("isAdmin");

export default function EditCourse() {
  //STATES
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  //GETTING THE CURRENT VALUE OF THE COURSE
  useEffect(() => {
    const courseId = localStorage.getItem("courseId");

    fetch(`https://newback-simply-book.onrender.com/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourseName(data.name);
        setPrice(data.price);
        setDescription(data.description);
      });
  }, []);

  const handleEditCourse = (e) => {
    e.preventDefault();

    const courseId = localStorage.getItem("courseId");
    console.log(courseId);

    fetch(`https://newback-simply-book.onrender.com/api/courses/${courseId}`, {
      method: "PUT",
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
          text: "You have successfully edited a course",
          icon: "success",
        });
        setCourseName("");
        setPrice("");
        setDescription("");
        localStorage.removeItem("courseId");
        navigate("/courses");
      }
    });
  };

  return (
    <>
      {isAdmin === "true" ? (
        <section className="container mx-auto ">
          <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
            <h1 className="text-black flex items-center mb-6 text-2xl font-semibold dark:text-white">
              Edit course
            </h1>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form action="" onSubmit={handleEditCourse}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Title
                    </label>
                    <input
                      type="text"
                      className="mb-5 bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Javascript"
                      value={courseName}
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
                      value={description}
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-5 justify-center ">
                    <Button>Edit Course</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h1>This is feature is not available</h1>
      )}
    </>
  );
}
