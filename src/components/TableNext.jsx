import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  // console.log(posts);

  return (
    <>
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Name </TableHead>
            <TableHead className="font-bold">Price </TableHead>
            <TableHead className="font-bold">Last 24h </TableHead>
            <TableHead className="font-bold">ATH </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {posts.map((post, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {post.market_cap_rank}.
                    <img width={25} alt={post.name} src={post.image} />
                  </TableCell>
                  <TableCell
                    key={post.name}
                    className={`${
                      post.name === "Chiliz" ? "text-red-500" : ""
                    }`}
                  >
                    {post.name}
                  </TableCell>
                  <TableCell key={post.current_price}>
                    {post.current_price}
                  </TableCell>
                  <TableCell
                    key={post.price_change_24h}
                    className={`${
                      post.price_change_24h.toString().startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {post.price_change_24h}
                  </TableCell>
                  <TableCell key={post.ath}>ATH : {post.ath}</TableCell>
                </TableRow>
              ))}
            </div>
          )}
        </TableBody>
      </Table>
    </>
  );
}
