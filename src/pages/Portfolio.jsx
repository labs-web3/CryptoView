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
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
export default function Portfolio() {
  const [selectCoins, setSelectedCoins] = useState({ id: "" });
  const [isOpen, setIsOpen] = useState();
  const [tableCoin, setTableCoin] = useState({});

  const trend = FetchCrypto(
    "https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
  );

  console.log(trend);

  const options = {
    method: "GET",
    headers: { x_cg_demo_api_key: "=CG-1t8kdBZJMA1YUmpjF5nypF6R" },
  };

  const handleSelectedCoins = (e) => {
    setSelectedCoins({ id: e.target.id });
    setIsOpen(false);
  };

  useEffect(() => {
    const updateTableCoin = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectCoins.id}`,
          options
        );
        const data = await response.json();
        setTableCoin({
          id: data.id,
          rank: data.market_cap_rank,
          img: data.image.thumb,
          name: data.name,
          symbol: data.symbol,
          price: data.market_data.current_price.usd,
          change24: data.market_data.price_change_percentage_24h,
          change7D: data.market_data.price_change_percentage_7d,
          cap: data.market_data.market_cap.usd,
        });
      } catch (error) {
        console.error("Error fetching crypto ID:", error);
      }
    };
    updateTableCoin();
  }, [selectCoins.id]);

  const arrowUpOrDown = (value) => {
    const direction = value?.toString().startsWith("-") ? "down" : "up";
    return (
      <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
        <path
          d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
        />
      </svg>
    );
  };
  return (
    <div className="container my-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">My Portfolio</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2" />
              Add coin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="space-y-3">
                <span>Add coin</span>
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" placeholder="Rechercher un token" />
              </DialogTitle>
              <div className="flex-1 overflow-y-auto max-h-80">
                <DialogDescription>
                  <span className="p-3">Trending Coins</span>
                  {trend.data.coins?.map((post) => {
                    return (
                      <ul key={post.item.id}>
                        <li
                          id={post.item.id}
                          className="block hover:bg-gray-200 p-3 rounded-xl text-black cursor-pointer"
                          onClick={(e) => handleSelectedCoins(e)}
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
                            <div className="flex justify-end flex-grow">
                              <span
                                className={`flex items-center ${
                                  post.item.data.price_change_percentage_24h.usd
                                    .toString()
                                    .startsWith("-")
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {arrowUpOrDown(
                                  post.item.data.price_change_percentage_24h.usd.toFixed(
                                    1
                                  )
                                )}
                                {post.item.data.price_change_percentage_24h.usd.toFixed(
                                  1
                                )}
                                %
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Coin</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>24h</TableHead>
            <TableHead>7d</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Holdings</TableHead>
            <TableHead>PNL</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{tableCoin.rank}</TableCell>
            <TableCell>
              <div className="flex gap-3 items-center">
                <img src={tableCoin.img} alt={tableCoin.name} />
                <span>{tableCoin.name}</span>
                <span className="uppercase text-gray-500">
                  {tableCoin.symbol}
                </span>
              </div>
            </TableCell>
            <TableCell>{tableCoin.price} $US</TableCell>
            <TableCell>{tableCoin.change24}</TableCell>
            <TableCell>{tableCoin.change7D}</TableCell>
            <TableCell>{tableCoin.cap} $US</TableCell>
            <TableCell>x</TableCell>
            <TableCell>x</TableCell>
            <TableCell>
              <Plus />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
