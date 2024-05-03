import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const notify = () => toast("Inscription envoyée !");

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3001/api/users/signup", {
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
      setTimeout(() => {
        //update the auth context
        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
      }, 3000);
    }
  };

  return { signup, isLoading, error };
};
