import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function TableNext() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchAsync = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum&x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchAsync();
  }, []);
  console.log(posts);
  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            {posts.map((post, index) => (
              <th key={index}>{post.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {posts.map((post, index) => (
              <td key={index}>{post.current_price}</td>
            ))}
          </tr>
          <tr>
            {posts.map((post, index) => (
              <td key={index}>{post.price_change_24h}</td>
            ))}
          </tr>
          <tr>
            {posts.map((post, index) => (
              <td key={index}>ATH : {post.ath}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
