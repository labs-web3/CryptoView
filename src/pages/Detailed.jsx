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
    <>
      <div className="md:container">
        <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {posts.id}
        </h1>
        <p
          className="leading-7 [&:not(:first-child)]:mt-6"
          dangerouslySetInnerHTML={{ __html: posts.description.en }}
        >
          {/* {posts.description.en} */}
        </p>
      </div>
    </>
  );
}
