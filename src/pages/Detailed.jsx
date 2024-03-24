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
import { Line } from "react-chartjs-2";

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

  let test = [
    {
      un: 1,
    },
    {
      deux: 2,
    },
    {
      trois: 3,
    },
  ];
  return (
    <>
      <div className="container py-10">
        <div className="flex flex-1 bg-green-300 h-1/2">
          <Line
            data={{
              datasets: [
                {
                  labels: "Volume",
                  data: test.map((data) => data.label),
                  backgroundColor: "#333",
                  borderColor: "#fff",
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
}
