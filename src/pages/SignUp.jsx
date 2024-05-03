import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInputField from "@/components/CustomInputField";
import { useSignup } from "@/hooks/useSignup";
import { ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignUp() {
  const { signup, isLoading, error } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    email: z.string().email({
      message: "Email not valid",
    }),
    password: z.string({
      message: "Password not valid",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await signup(data.email, data.password);
    if (!error) {
      form.reset();
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-screen bg-black">
      <ToastContainer />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 shadow-lg rounded-3xl bg-slate-300 p-10 md:w-1/3"
        >
          <div className="flex justify-center">
            <img
              src="/public/assets/cptoview-removebg-preview.png"
              alt="CryptoView Logo"
              width={250}
              height={250}
            />
          </div>
          <h1 className="font-bold text-5xl text-center">Sign Up</h1>
          <div className="py-8 space-y-6">
            <CustomInputField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="example@example.com"
            />
            <div className=" w-full relative">
              <CustomInputField
                control={form.control}
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder=""
              />
              <div
                className="absolute inset-y-10 right-0  items-center px-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
            {isLoading ? (
              <Button
                disabled={isLoading}
                className="w-full rounded bg-black hover:bg-slate-700"
                type="submit"
                size="lg"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading
              </Button>
            ) : (
              <Button
                disabled={isLoading}
                className="w-full rounded bg-black hover:bg-slate-700"
                type="submit"
                size="lg"
              >
                Submit
              </Button>
            )}
            {error && <div className="text-red-500 font-semibold">{error}</div>}
            <div className="flex space-x-2 items-center">
              <h2>Already have an account ? </h2>
              <a
                href="./Signin"
                className=" font-semibold border py-2 px-3 border-black rounded-full hover:bg-black hover:text-white"
              >
                Sign In
              </a>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
