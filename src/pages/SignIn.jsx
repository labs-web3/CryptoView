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
      email: "example@example.com",
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
    <div className="container flex items-center justify-center h-screen">
      <ToastContainer />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 shadow-lg rounded-xl bg-slate-300 p-10"
        >
          <div className="flex justify-center">
            <img
              src="/public/assets/cryptoview.png"
              alt="CryptoView Logo"
              width={200}
              height={200}
            />
          </div>
          <h1 className="font-bold text-5xl text-center">
            Welcome to CryptoView
          </h1>
          <div className="py-8 space-y-6">
            <CustomInputField
              control={form.control}
              name="email"
              label="email"
              type="email"
              placeholder="example@example.com"
            />
            <div className=" w-full relative">
              <CustomInputField
                control={form.control}
                name="password"
                label="password"
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
            <Button
              disabled={isLoading}
              className="w-full rounded-full bg-black hover:bg-slate-500"
              type="submit"
              size="lg"
            >
              Submit
            </Button>
            {error && <div className="text-red-500 font-semibold">{error}</div>}
            <div className="flex space-x-2">
              <h2>Don't have an account ? </h2>
              <a href="./SignUp" className="text-blue-600 font-bold">
                Sign Up
              </a>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
