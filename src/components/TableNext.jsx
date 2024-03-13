import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
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
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
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

  const formatPercentage = (value) => {
    return Intl.NumberFormat({
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <>
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Name </TableHead>
            <TableHead className="font-bold">Price </TableHead>
            <TableHead className="font-bold">1 h </TableHead>
            <TableHead className="font-bold">24 h </TableHead>
            <TableHead className="font-bold">7 j </TableHead>
            <TableHead className="font-bold">Last 24h </TableHead>
            <TableHead className="font-bold">ATH </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <p>Loading...</p>
          ) : (
            posts.map((post, index) => (
              <TableRow key={index}>
                <TableCell
                  key={post.name}
                  className={`${post.name === "Chiliz" ? "text-red-500" : ""}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span style={{ marginRight: "5px" }}>
                    {post.market_cap_rank}.
                  </span>
                  <img
                    width={25}
                    alt={post.name}
                    src={post.image}
                    style={{ marginRight: "5px" }}
                  />
                  <span>{post.name}</span>
                </TableCell>
                <TableCell key={post.current_price}>
                  ${post.current_price}
                </TableCell>
                <TableCell key={post.price_change_percentage_1h_in_currency}>
                  {formatPercentage(
                    post.price_change_percentage_1h_in_currency
                  )}
                  %
                </TableCell>
                <TableCell key={post.price_change_percentage_24h_in_currency}>
                  {formatPercentage(
                    post.price_change_percentage_24h_in_currency
                  )}
                  %
                </TableCell>
                <TableCell key={post.price_change_percentage_7d_in_currency}>
                  {formatPercentage(
                    post.price_change_percentage_7d_in_currency
                  )}
                  %
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
                <TableCell key={post.ath}>${post.ath}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
}
