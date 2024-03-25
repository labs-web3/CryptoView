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
import { useState } from "react";

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
  console.log(cryptos);
  if (loading) {
    return <p>Loading...</p>;
  }

  const formattedPrices = cryptos.prices.map((entry) => ({
    time: new Date(entry[0]).toLocaleTimeString(),
    value: entry[1],
  }));

  // const data = [
  //   { time: "Janvier", value: 100 },
  //   { time: "Février", value: 120 },
  //   { time: "Mars", value: 130 },
  //   { time: "Avril", value: 110 },
  //   { time: "Mai", value: 110 },
  // ];

  return (
    <>
      <div className="container py-10">
        <div className="flex justify-center h-1/2">
          <LineChart data={formattedPrices} />
        </div>
      </div>
    </>
  );
}
