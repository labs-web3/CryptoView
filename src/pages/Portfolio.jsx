import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function MyAccount() {
  return (
    <>
      <div className="container py-16">
        <Card className="bg-[#eeeeee] shadow-xl">
          <CardHeader className="pb-3">
            <CardDescription className="text-xl t text-[#777]">
              Balance Available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <span className="text-black font-bold text-3xl">40000 $</span>
              <div className="flex gap-3">
                <Button className="bg-white text-black font-bold shadow-xl px-6">
                  Buy
                </Button>
                <Button className="bg-white text-black font-bold shadow-xl px-6">
                  Receive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
