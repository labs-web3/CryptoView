import FetchCrypto from "@/hooks/FetchCrypto";
import { useParams } from "react-router-dom";

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
    <div>
      <p>{posts.id}</p>
    </div>
  );
}
