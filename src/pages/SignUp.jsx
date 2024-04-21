import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInputField from "@/components/CustomInputField";

export default function SignUp() {
  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(10, { message: "Username must be max 10 characters." }),
    email: z.string().email({
      message: "Email not valid",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Boris",
      email: "picardboris@gmail.com",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
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
            name="username"
            label="Username"
            placeholder="Boris"
          />
          <CustomInputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="picardboris@gmail.com"
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
