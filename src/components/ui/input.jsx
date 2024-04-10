import * as React from "react";

import { cn } from "/src/lib/utils";
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
