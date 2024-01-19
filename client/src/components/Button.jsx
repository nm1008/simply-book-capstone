const Button = ({ onClick, children }) => {
  return (
    <button className="mt-5 w-3/4 text-white bg-primary-600 bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
