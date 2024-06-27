import { Button } from "@nextui-org/react";
import { useState } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return <Button onClick={() => darkModeHandler()}></Button>;
};

export default DarkModeToggle;
