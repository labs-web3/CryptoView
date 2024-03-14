import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FetchCrypto from "@/hooks/FetchCrypto";

export default function TableNext() {
  const { posts, loading } = FetchCrypto(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
  );

  const formatPercentage = (value) => {
    return Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      signDisplay: "never",
    }).format(value / 100);
  };

  const arrowUpOrDown = (value) => {
    if (value.toString().startsWith("-")) {
      const arrow = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      );
      return arrow;
    } else {
      const arrow = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
            clipRule="evenodd"
          />
        </svg>
      );
      return arrow;
    }
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
                <TableCell
                  key={post.price_change_percentage_1h_in_currency}
                  className={`${
                    post.price_change_percentage_1h_in_currency
                      .toString()
                      .startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <span style={{ display: "flex" }}>
                    {arrowUpOrDown(post.price_change_percentage_1h_in_currency)}
                    {formatPercentage(
                      post.price_change_percentage_1h_in_currency
                    )}
                  </span>
                </TableCell>
                <TableCell
                  key={post.price_change_percentage_24h_in_currency}
                  className={`${
                    post.price_change_percentage_24h_in_currency
                      .toString()
                      .startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <span style={{ display: "flex" }}>
                    {arrowUpOrDown(
                      post.price_change_percentage_24h_in_currency
                    )}
                    {formatPercentage(
                      post.price_change_percentage_24h_in_currency
                    )}
                  </span>
                </TableCell>
                <TableCell
                  key={post.price_change_percentage_7d_in_currency}
                  className={`${
                    post.price_change_percentage_7d_in_currency
                      .toString()
                      .startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <span style={{ display: "flex" }}>
                    {arrowUpOrDown(post.price_change_percentage_7d_in_currency)}
                    {formatPercentage(
                      post.price_change_percentage_7d_in_currency
                    )}
                  </span>
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
