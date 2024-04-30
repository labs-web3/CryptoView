import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useSignin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const notify = () => toast("Logged in successfully !");

  const signin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3001/api/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      notify();
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      //update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { signin, isLoading, error };
};
