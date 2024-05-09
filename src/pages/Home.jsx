import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FetchCrypto from "@/hooks/FetchCrypto";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import Categories from "@/components/Categories";
import CoinsList from "@/components/CoinsList";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Popover } from "react-tiny-popover";
import { Search } from "lucide-react";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function Home() {
  const { pageNumber = 1 } = useParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const setPage = (num) => navigate(`/page/${num}`);

  const totalCoins = 14038;
  const coinPerPage = 100;
  const totalPages = Math.ceil(totalCoins / coinPerPage);

  const top = FetchCrypto(
    `https://api.coingecko.com/api/v3/coins/markets?page=${pageNumber}&vs_currency=usd&price_change_percentage=1h%2C24h%2C7d&sparkline=true&x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R`
  );
  const trend = FetchCrypto(
    "https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
  );

  const categories = FetchCrypto(
    "https://api.coingecko.com/api/v3/coins/categories?x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
  );

  const query = FetchCrypto(
    `https://api.coingecko.com/api/v3/search?query=${searchText}&x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R`
  );

  const handleCategories = () => {
    navigate("/categories");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const arrowUpOrDown = (value) => {
    const direction = value?.toString().startsWith("-") ? "down" : "up";
    return (
      <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
        <path
          d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
        />
      </svg>
    );
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filterSearch = query.data?.coins?.filter((elem) => {
    console.log(elem);
    if (searchText === "") {
      return true;
    } else {
      return elem.name.toLowerCase().includes(searchText);
    }
  });

  // const handleHoverStats = () => {
  //   return <div className="col-span-1">123</div>;
  // };

  // if (top.loading || trend.loading || categories.loading || query.loading) {
  //   return <div>Loading...</div>;
  // }

  if (top.error || trend.error || categories.error || query.error) {
    return (
      <div className="container">
        <div className="flex justify-center h-full items-center flex-col space-y-4">
          <h1 className="text-red-500 text-7xl font-bold">An error occured</h1>
          <Button
            onClick={handleRefresh}
            className="bg-black text-white font-bold w-1/4 hover:bg-gray-600"
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex my-5">
        {trend.loading ? (
          <SkeletonCard />
        ) : (
          <Card>
            <CardHeader>
              <span className="font-bold px-3 text-xl">🔥 Tendance</span>
            </CardHeader>
            <CardContent>
              {/* utilisation de slice a la place de filter plus optimisé */}
              {/* filter parcourt tout le tableau alors que slice s'arrete a 3 dans ce cas */}
              {trend.data.coins.slice(0, 3).map((coin) => {
                return (
                  <Link key={coin.item.id} to={`/${coin.item.id}`}>
                    <div className="flex items-center space-x-3 hover:bg-slate-600 p-3 rounded-xl">
                      <img
                        src={coin.item.small}
                        alt={coin.item.name}
                        width={25}
                      />
                      <span>{coin.item.name}</span>
                      <span>{coin.item.data.price.toFixed(4)} $</span>
                      <span
                        className={`flex items-center ${
                          coin.item.data.price_change_percentage_24h.usd
                            .toString()
                            .startsWith("-")
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {arrowUpOrDown(
                          coin.item.data.price_change_percentage_24h.usd.toFixed(
                            1
                          )
                        )}
                        {coin.item.data.price_change_percentage_24h.usd.toFixed(
                          1
                        )}
                        %
                      </span>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
      <div className="flex mb-3 justify-between">
        <Button
          onClick={handleCategories}
          className={`bg-transparent text-dark hover:bg-slate-200 ${
            location.pathname === "/categories"
              ? "bg-slate-200 cursor-auto"
              : ""
          }`}
        >
          Catégories
        </Button>
        <Popover
          isOpen={isPopoverOpen}
          positions={"bottom"}
          padding={10}
          onClickOutside={() => setIsPopoverOpen(false)}
          transform={{ top: -50, left: -140 }}
          transformMode="relative"
          content={
            <div className="md:min-w-[1200px] container rounded bg-gray-300">
              <Input
                type="search"
                placeholder="Rechercher un token"
                onChange={handleSearch}
                value={searchText}
              />
              {searchText ? (
                ""
              ) : (
                <div className="grid grid-cols-2">
                  <div className="col-span-1">
                    {/* Ici nous mappons tous les coins à part */}
                    {trend.data.coins?.map((coin) => (
                      <Link
                        key={coin.item.id}
                        to={`/${coin.item.id}`}
                        className="block hover:bg-slate-600 p-3 rounded-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={coin.item.small}
                            alt={coin.item.name}
                            width={25}
                          />
                          <span>{coin.item.name}</span>
                          <span>{coin.item.symbol}</span>
                          <span>{coin.item.data.price.toFixed(4)} $</span>
                          <span
                            className={`flex items-center ${
                              coin.item.data.price_change_percentage_24h.usd
                                .toString()
                                .startsWith("-")
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {arrowUpOrDown(
                              coin.item.data.price_change_percentage_24h.usd.toFixed(
                                1
                              )
                            )}
                            {coin.item.data.price_change_percentage_24h.usd.toFixed(
                              1
                            )}
                            %
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="col-span-1">
                    <div>dadad</div>
                  </div>
                </div>
              )}
              {filterSearch?.map((data) => {
                if (data.market_cap_rank == null) {
                  return;
                }
                return (
                  <Link
                    to={`/${data.id}`}
                    className="hover:bg-gray-200 flex p-3"
                    key={data.id}
                  >
                    <span className="mr-2">{data.market_cap_rank}.</span>
                    <img
                      width={25}
                      alt={data.name}
                      src={data.thumb}
                      style={{ marginRight: "5px" }}
                    />
                    <span>{data.name}</span>
                  </Link>
                );
              })}
            </div>
          }
        >
          <div
            className="bg-gray-300 rounded flex items-center px-3 w-1/4 space-x-2 hover:bg-gray-400 transition "
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <Search className="size-5" />
            <span className="font-semibold">Rechercher</span>
          </div>
        </Popover>
      </div>
      {location.pathname === "/categories" ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Name </TableHead>
                <TableHead className="font-bold">Top 3 Coins </TableHead>
                <TableHead className="font-bold">24 h</TableHead>
                <TableHead className="font-bold">Volume sur 24 h</TableHead>
                <TableHead className="font-bold">
                  Capitalisation boursière
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.data.map((post, index) => {
                return <Categories post={post} key={index} index={index} />;
              })}
            </TableBody>
          </Table>
        </>
      ) : (
        <>
          <Table>
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
              {top.data.map((post, index) => {
                return <CoinsList post={post} key={index} />;
              })}
            </TableBody>
          </Table>
        </>
      )}
      <div className="flex justify-center my-5">
        {location.pathname !== "/categories" && (
          <Pagination
            totalPages={totalPages}
            currentPage={parseInt(pageNumber, 10)}
            setCurrentPage={setPage}
            pagesCount={totalPages}
            pagesCutCount={5}
          />
        )}
      </div>
    </div>
  );
}
