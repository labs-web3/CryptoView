import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function TableNext() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAsync = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
        );
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchAsync();
  }, []);
  console.log(posts);
  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="font-bold">Name </th>
            <th className="font-bold">Price </th>
            <th className="font-bold">Last 24h </th>
            <th className="font-bold">ATH </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <tr>
              {posts.map((post, index) => (
                <tr key={index}>
                  <td>
                    {post.market_cap_rank}.
                    <img width={25} alt={post.name} src={post.image} />
                  </td>
                  <td
                    key={post.name}
                    className={`${
                      post.name === "Chiliz" ? "text-red-500" : ""
                    }`}
                  >
                    {post.name}
                  </td>
                  <td key={post.current_price}>{post.current_price}</td>
                  <td key={post.price_change_24h}>{post.price_change_24h}</td>
                  <td key={post.ath}>ATH : {post.ath}</td>
                </tr>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
