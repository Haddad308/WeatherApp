import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(new Date().getHours() < 12 ? false : true);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <>
      {dark ? (
        <FaMoon
          className="cursor-pointer text-gray-100"
          size={35}
          onClick={() => darkModeHandler()}
        />
      ) : (
        <MdSunny
          className="cursor-pointer"
          size={35}
          onClick={() => darkModeHandler()}
        />
      )}
    </>
  );
};

export default DarkModeToggle;
