import React from "react";
import { login } from "../models/auth";
import { Button } from "./ui/button";

export const SignInButton = ({ id }: { id: string }) => {
  const [error, setError] = React.useState<boolean>(false);

  const signInUser = async (id: string) => {
    try {
      await login(id);
      window.location.reload();
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Button
      variant={error ? "destructive" : "link"}
      onClick={() => signInUser(id)}
    >
      Sign In
    </Button>
  );
};