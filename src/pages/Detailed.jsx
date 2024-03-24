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
  return (
    <>
      <div className="lg:container py-10">
        <div className="flex"></div>
      </div>
    </>
  );
}
