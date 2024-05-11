import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function Portfolio() {
  return (
    <div className="container my-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">My Portfolio</h1>
        <Button>Add a coin</Button>
      </div>
      <div className="grid grid-cols-4 my-5 ">
        <Card className="col-span-1 p-4 space-y-2">
          <CardTitle className="font-bold">$1,500</CardTitle>
          <CardDescription>Current Balance</CardDescription>
        </Card>
        <Card className="col-span-1 p-4 space-y-2">
          <CardTitle className="text-red-500 font-bold">-$76 </CardTitle>
          <CardDescription>24h Portfolio Change</CardDescription>
        </Card>
        <Card className="col-span-1 p-4 space-y-2">
          <CardTitle className="font-bold text-red-500">-$150</CardTitle>
          <CardDescription>Total Profit / Loss</CardDescription>
        </Card>
        <Card className="col-span-1 p-4 space-y-2">
          <CardTitle className="font-bold">Cosmos</CardTitle>
          <CardDescription>
            Top Gainer (24h){" "}
            <span className="font-bold text-red-500">-$20</span>
          </CardDescription>
        </Card>
      </div>
    </div>
  );
}
