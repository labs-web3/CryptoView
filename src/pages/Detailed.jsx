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

export default function Detailed() {
  const { id } = useParams();
  const { posts, loading } = FetchCrypto(
    `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R`
  );
  console.log(posts);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="lg:container py-10">
        <div className="flex">
          <Card>
            <CardHeader>
              <CardTitle>{posts.name}</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
