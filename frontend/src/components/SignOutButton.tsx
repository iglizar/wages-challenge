import { Button } from "./ui/button";

export const SignOutButton = () => {
  const signOutUser = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <Button variant={"default"} size="sm" onClick={() => signOutUser()}>
      Sign Out
    </Button>
  );
};
