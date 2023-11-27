import React from "react";
// import useMyContext from "../context/useMyContext";
import { signInUser } from "../auth";
const SignInPage = () => {
  // const {user}
  return (
    <div className="h-screen bg-green-200 flex items-center justify-center">
      <div className="rounded-lg h-max w-9/12 max-w-[300px] bg-white">
        <button
          onClick={signInUser}
          className="bg-green-800 block my-10 mx-auto text-green-50 px-8 py-2 rounded-md"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
