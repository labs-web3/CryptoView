import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInputField from "@/components/CustomInputField";
import { useSignin } from "@/hooks/useLogin";
import { ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const { signin, isLoading, error } = useSignin();
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
    await signin(data.email, data.password);
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
          <h1 className="font-bold text-5xl text-center">Sign In</h1>
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
                disabled
                className="w-full rounded bg-black hover:bg-slate-700"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
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
              <h2>Don't have an account ? </h2>
              <a
                href="./SignUp"
                className=" font-semibold border py-2 px-3 border-black rounded-full hover:bg-black hover:text-white"
              >
                Sign Up
              </a>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
