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
import LineChart from "@/components/LineChart";
import { useEffect, useState } from "react";

export default function Detailed() {
  const [days, setDays] = useState("days=1");
  const { id } = useParams();
  const options = {
    method: "GET",
    headers: { x_cg_demo_api_key: "=CG-1t8kdBZJMA1YUmpjF5nypF6R" },
  };

  const getCrypto = FetchCrypto(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&${days}, ${options}`
  );

  const getCryptoId = FetchCrypto(
    `https://api.coingecko.com/api/v3/coins/${id}`,
    options
  );

  const formattedPrices = getCrypto.data?.prices?.map((entry) => ({
    time: new Date(entry[0]).toLocaleTimeString([], {
      month: "long",
      day: "numeric",
    }),
    value: entry[1],
  }));

  const lastPrice = getCrypto.data?.prices?.pop();

  const arrowUpOrDown = (value) => {
    const direction = value?.toString().startsWith("-") ? "down" : "up";
    return (
      <div className="flex items-center justify-start">
        <h1 className="font-bold text-4xl">
          {lastPrice[1] > 1 ? lastPrice[1].toFixed(2) : lastPrice[1].toFixed(5)}{" "}
          $US
        </h1>
        <svg
          fill="currentColor"
          className={`w-7 h-7 ${
            direction === "down" ? "text-red-500" : "text-green-500"
          }`}
          viewBox="0 0 20 20"
        >
          <path
            d={direction === "up" ? "M7 14l5-5 5 5H7z" : "M7 10l5 5 5-5H7z"}
          />
        </svg>
        <span
          className={`font-semibold text-xl ${
            direction === "down" ? "text-red-500" : "text-green-500"
          }`}
        >
          {value}%
        </span>
      </div>
    );
  };

  const handleDays = () => {
    setDays("days=1");
  };

  const handleSevenDays = () => {
    setDays("days=7");
  };

  const handleOneMonth = () => {
    setDays("days=30");
  };

  if (getCrypto.loading || getCryptoId.loading) {
    return <p>Loading...</p>;
  }

  if (getCrypto.data == [] || getCryptoId == []) {
    return <p>Refresh to get data</p>;
  }

  return (
    <>
      <div className="container py-10">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 border-r-2">
            {arrowUpOrDown(
              getCryptoId.data.market_data.price_change_percentage_24h.toFixed(
                1
              )
            )}
          </div>
          <div className="col-span-3">
            <div className="flex justify-end">
              <div className="inline-flex rounded-lg shadow-sm">
                <button
                  onClick={() => handleDays()}
                  type="button"
                  className={`${
                    days === "days=1" ? "bg-gray-300 cursor-auto" : "bg-white"
                  } py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200  text-gray-800 shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 `}
                >
                  24h
                </button>
                <button
                  onClick={() => handleSevenDays()}
                  type="button"
                  className={`${
                    days === "days=7" ? "bg-gray-300 cursor-auto" : "bg-white"
                  } py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200  text-gray-800 shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 `}
                >
                  7j
                </button>
                <button
                  type="button"
                  onClick={() => handleOneMonth()}
                  className={`${
                    days === "days=30" ? "bg-gray-300 cursor-auto" : "bg-white"
                  } py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200  text-gray-800 shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 `}
                >
                  1m
                </button>
              </div>
            </div>
            <LineChart data={formattedPrices} />
          </div>
        </div>
      </div>
    </>
  );
}
