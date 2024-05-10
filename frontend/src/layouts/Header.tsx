import { SignOutButton } from "../components/SignOutButton";

export const Header = () => {
  const isUserLoggedIn = localStorage.getItem("user") !== null;
  return (
    <header className="flex justify-between h-20 w-full shrink-0 items-center px-4 md:px-6 bg-bluePrimary text-black select-none">
      <div className="flex items-center">
        <span className="text-lg font-bold text-white">Loula Employees</span>
      </div>
      {isUserLoggedIn && <SignOutButton />}
    </header>
  );
};
