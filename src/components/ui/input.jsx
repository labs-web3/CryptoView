import * as React from "react";

import { cn } from "/src/lib/utils";
import { Search } from "lucide-react";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
    >
      <Search className="h-[16px] w-[16px]" />
      <input
        {...props}
        type={type}
        ref={ref}
        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
