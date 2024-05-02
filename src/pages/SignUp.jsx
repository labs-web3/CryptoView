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
      email: "example@example.com",
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
    <div className="container flex items-center justify-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 shadow-lg rounded-xl bg-slate-300 p-10 w-96"
        >
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
          >
            Submit
          </Button>
          <ToastContainer />
          {error && <div className="text-red-500 font-semibold">{error}</div>}
          <h2>Already an account ?</h2>
          <a href="./SignIn">Sign In</a>
        </form>
      </Form>
    </div>
  );
}
