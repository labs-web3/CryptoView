import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FetchCrypto from "@/hooks/FetchCrypto";
import { Link } from "react-router-dom";
export default function Portfolio() {
  const trend = FetchCrypto(
    "https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
  );
  console.log(trend);
  return (
    <div className="container my-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">My Portfolio</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Share</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="space-y-3">
                <span>Share link</span>
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" />
              </DialogTitle>
              <div className="flex-1 overflow-y-auto max-h-80">
                <DialogDescription>
                  <span>Trending Coins</span>
                  {trend.data.coins?.map((post) => {
                    return (
                      <Link
                        className="block hover:bg-gray-200 p-3 rounded-xl"
                        key={post.item.id}
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            width={25}
                            alt={post.item.name}
                            src={post.item.thumb}
                            style={{ marginRight: "5px" }}
                          />
                          <span className="font-semibold">
                            {post.item.name}
                          </span>
                          <span className="text-gray-500">
                            {post.item.symbol}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </DialogDescription>
              </div>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-4 my-5 gap-1">
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
