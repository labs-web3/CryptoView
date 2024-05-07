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

  useEffect(() => {
    if (getCrypto.data) {
      console.log(getCrypto);
    }
  }, [getCrypto.data, days]);

  useEffect(() => {
    if (getCryptoId) {
      console.log(getCryptoId);
    }
  }, [getCryptoId.data]);

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

  console.log(getCrypto);
  const formattedPrices = getCrypto.data?.prices?.map((entry) => ({
    time: new Date(entry[0]).toLocaleTimeString([], {
      month: "long",
      day: "numeric",
    }),
    value: entry[1],
  }));
  const lastPrice = getCrypto.data.prices.pop();
  return (
    <>
      <div className="container py-10">
        <div className="grid grid-cols-4">
          <div className="col-span-1 ">
            <h1>
              {lastPrice[1] > 1
                ? lastPrice[1].toFixed(0)
                : lastPrice[1].toFixed(5)}
            </h1>
            <h1>azdadad</h1>
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
