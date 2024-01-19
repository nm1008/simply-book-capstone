//Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function ProfilePage() {
  // States to store user information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState([]); // Stores the user's enrolled courses

  // Navigate function from react-router-dom
  const navigate = useNavigate();

  // Get the isAdmin value from localStorage (for admin privilege)
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    try {
      // Get the user's ID from localStorage
      const id = localStorage.getItem("_id");

      // Fetch user data by their ID
      fetch(`https://newback-simply-book.onrender.com/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // Set user data to the state variables
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setMobileNumber(data.mobileNo);
          setEmail(data.email);

          // Fetch enrolled courses data by their IDs
          const coursePromises = data.enrollments.map((course) => {
            return fetch(
              `https://newback-simply-book.onrender.com/api/courses/${course.courseId}`
            ).then((res) => res.json());
          });

          // Use Promise.all to handle multiple course data fetches
          Promise.all(coursePromises).then((courseData) => {
            setCourses(courseData); // Set the user's enrolled courses
          });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Function to handle editing the user's profile
  const handleEditProfile = () => {
    navigate("/EditProfile"); // Redirect to the EditProfile page
  };

  return (
    <>
      <section className="container mx-auto">
        <div className=" flex flex-col items-center mt-20 px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 dark:text-white">
              <div className="flex gap-3 justify-center items-center text-md lg:text-lg ">
                <h1 className=" font-bold">Name: </h1>
                <h1>{firstName}</h1>
                <h1>{lastName}</h1>
              </div>
              <div className="flex gap-3 justify-center items-center text-md mt-5 lg:text-lg">
                <h1 className=" font-bold">Email: </h1>
                <h1>{email}</h1>
              </div>

              <div className="flex gap-3 justify-center items-center text-md mt-5 lg:text-lg">
                <h1 className=" font-bold">Phone number: </h1>
                <h1>{mobileNumber}</h1>
              </div>
              {isAdmin === "false" && (
                <div className="flex justify-around gap-2 mb-5 w-full">
                  <Button onClick={() => handleEditProfile()}>
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* Display user enrolled courses */}
          <div className="flex">
            {isAdmin === "false" &&
              courses.map((data, i) => (
                <section
                  key={i}
                  className="h-48 w-64 my-16 mx-5 bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <h1 className="mt-5 font-bold text-md text-center">
                    {data.name}
                  </h1>
                  {data.enrollees.map((date, i) => (
                    <>
                      <div key={i} className="text-black dark:text-white">
                        <h3 className="mt-5 text-center">Enrolled date:</h3>
                        <p className="text-center ">
                          {date.enrolledOn.slice(0, 10)}
                        </p>
                      </div>
                    </>
                  ))}
                </section>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
