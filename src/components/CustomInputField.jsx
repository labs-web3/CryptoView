import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { InputForm } from "./ui/input";

const CustomInputField = ({ control, name, label, placeholder, type }) => {
  return (
    <FormField
      control={control}
      name={name}
      type={type}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputForm placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInputField;
