import { SignInTable } from "../components/tables/SignIn";
import React from "react";
import { useUsers } from "../models/users";

export interface User {
  id: string;
}

const Users = () => {
  const { data } = useUsers();

  return (
    <div className="container mx-auto py-10 sm:w-1/2">
      {data?.employeesIds && <SignInTable data={data.employeesIds} />}
    </div>
  );
};

export default Users;
