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
  const { loading } = FetchCrypto(
    `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R`
  );
  console.log(cryptos);
  if (loading) {
    return <p>Loading...</p>;
  }
  const data = [
    { time: "Janvier", value: 100 },
    { time: "Février", value: 120 },
    { time: "Mars", value: 130 },
    { time: "Avril", value: 110 },
    { time: "Mai", value: 110 },
  ];

  return (
    <>
      <div className="container py-10">
        <div className="flex flex-1 bg-green-300 h-1/2">
          <LineChart data={data} />
        </div>
      </div>
    </>
  );
}
