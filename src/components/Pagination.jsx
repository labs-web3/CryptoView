import { Button } from "./ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Pagination({ nb, onClick, prev, after }) {
  const [active, setActive] = useState(nb);

  const getItemProps = (index) => ({
    variant: active === index ? "ghost" : "null",
    onClick: () => setActive(index),
    className: "rounded-full",
  });

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={nb === 1}
      >
        <ArrowLeft strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        <Button {...getItemProps(nb)} onClick={onClick}>
          {nb}
        </Button>
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={after}
        disabled={nb === 10}
      >
        Next
        <ArrowRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
