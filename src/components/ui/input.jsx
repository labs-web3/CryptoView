import * as React from "react";

import { cn } from "../../lib/utils.js";
import { Search } from "lucide-react";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <div className="flex items-center border rounded-lg p-3 text-sm focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-0">
      <Search className="size-5" />
      <input
        {...props}
        type={type}
        placeholder="Rechercher un token par son symbol"
        ref={ref}
        className="size-full ml-2 border-none bg-transparent focus:outline-none"
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };

const InputForm = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
InputForm.displayName = "InputForm";

export { InputForm };
