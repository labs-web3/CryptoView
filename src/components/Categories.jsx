import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

const PriceChangeCell = ({ value }) => {
  const arrowUpOrDown = (value) => {
    const direction = value?.toString().startsWith("-") ? "down" : "up";
    return (
      <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
        <path
          d={direction === "up" ? "M7 14l5-5 5 5H7z" : "M7 10l5 5 5-5H7z"}
        />
      </svg>
    );
  };

  const formatPercentage = (value) => {
    return Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      signDisplay: "never",
    }).format(value / 100);
  };

  return (
    <TableCell
      className={
        value?.toString().startsWith("-") ? "text-red-500" : "text-green-500"
      }
    >
      <div className="flex">
        {arrowUpOrDown(value)}
        {formatPercentage(value)}
      </div>
    </TableCell>
  );
};

export default function Categories({ post }) {
  return (
    <TableRow>
      <Link to={`/${post.id}`}>
        <TableCell
          className={`${
            post.name === "Chiliz" ? "text-red-500" : ""
          } flex items-center`}
        >
          <span className="mr-2">{post.market_cap_rank}.</span>
          <span>{post.name}</span>
        </TableCell>
      </Link>
      <TableCell>${post.current_price}</TableCell>
      <PriceChangeCell value={post.price_change_percentage_1h_in_currency} />
      <PriceChangeCell value={post.price_change_percentage_24h_in_currency} />
      <PriceChangeCell value={post.price_change_percentage_7d_in_currency} />
      <TableCell>${post.ath}</TableCell>
    </TableRow>
  );
}
