import FetchCrypto from "@/hooks/FetchCrypto";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCryptoStore } from "@/zustand/store";
import LineChart from "@/components/LineChart";

export default function Detailed() {
  const { cryptos } = useCryptoStore();
  const { id } = useParams();
  const options = {
    method: "GET",
    headers: { x_cg_demo_api_key: "=CG-1t8kdBZJMA1YUmpjF5nypF6R" },
  };
  const { loading } = FetchCrypto(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1, ${options}`
  );
  if (loading) {
    return <p>Loading...</p>;
  }

  const formattedPrices = cryptos.prices
    .map((entry) => ({
      time: new Date(entry[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: entry[1],
    }))
    .filter((entry, index) => index % 4 === 0);
  console.log(formattedPrices);

  const lastPrice = cryptos.prices.at(0);
  const roundedLastPrice = Math.round(lastPrice[1]);

  return (
    <>
      <div className="container py-10">
        <h1>{roundedLastPrice}</h1>
        <div className="flex justify-center h-1/2">
          <LineChart data={formattedPrices} />
        </div>
      </div>
    </>
  );
}
