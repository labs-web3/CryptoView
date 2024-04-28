import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInputField from "@/components/CustomInputField";

export default function SignUp() {
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
    const response = await fetch("http://localhost:3001/api/users/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      form.setError(json.error);
    }
    if (response.ok) {
      form.setError(null);
      form.reset();
      console.log("new user added", json);
    }
  };

  return (
    <div className="container flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 shadow-lg rounded-xl bg-slate-300 p-52"
        >
          <CustomInputField
            control={form.control}
            name="email"
            label="email"
            type="email"
            placeholder="example@example.com"
          />
          <CustomInputField
            control={form.control}
            name="password"
            label="password"
            type="password"
            placeholder=""
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
