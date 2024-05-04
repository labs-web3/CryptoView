import { Button } from "./ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Pagination() {
  const [active, setActive] = useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "ghost" : "null",
    onClick: () => setActive(index),
    className: "rounded-full",
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeft strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        <Button {...getItemProps(1)}>1</Button>
        <Button {...getItemProps(2)}>2</Button>
        <Button {...getItemProps(3)}>3</Button>
        <Button {...getItemProps(4)}>4</Button>
        <Button {...getItemProps(5)}>5</Button>
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === 5}
      >
        Next
        <ArrowRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
