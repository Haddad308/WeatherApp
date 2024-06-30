import DarkModeToggle from "../DarkModeToggle";
import SearchBar from "../SearchBar";

const Header = ({ setSearchQuery }: { setSearchQuery: any }) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-start md:justify-between  md:items-center  py-5 text-blue-950 dark:text-gray-100">
      <div>
        <h1 className=" text-xl md:text-4xl font-bold">
          Welcom to our weather app
        </h1>
        <p className="hidden md:block font-medium text-xl">
          here you can find all things
        </p>
      </div>
      <div className="flex items-center  gap-5 md:w-96">
        <SearchBar setSearchQuery={setSearchQuery} />
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Header;
