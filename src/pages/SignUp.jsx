import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInputField from "@/components/CustomInputField";

export default function SignUp() {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Email not valid",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container ">
      <div className="flex h-full justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 shadow-lg p-60 rounded-xl bg-slate-300 w-full"
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
    </div>
  );
}
