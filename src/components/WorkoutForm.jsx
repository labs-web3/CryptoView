import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInputField from "@/components/CustomInputField";

export default function WorkoutForm() {
  const formSchema = z.object({
    title: z
      .string()
      .min(2, {
        message: "title must be at least 2 characters.",
      })
      .max(10, { message: "title must be max 10 characters." }),
    load: z.number(),
    reps: z.number(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      load: 5,
      reps: 7,
    },
  });

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:3001/api/workouts/", {
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
      console.log("new workout added", json);
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
            name="title"
            label="title"
            type="text"
            placeholder=""
          />
          <CustomInputField
            control={form.control}
            type="number"
            name="load"
            label="load"
            placeholder=""
          />
          <CustomInputField
            control={form.control}
            type="number"
            name="reps"
            label="reps"
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
