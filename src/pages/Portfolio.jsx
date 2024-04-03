import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Web3 } from "web3";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MyAccount() {
  const [connectedAccount, setConnectedAccount] = useState();
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState(null);
  const [tokenList, setTokenList] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedSecondItem, setSelectedSecondItem] = useState([]);
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [tokenPrice, setTokenPrice] = useState([]);
  const [current, setCurrent] = useState({
    from: "",
    to: "",
    decimals: 18,
  });
  const [gasFee, setGasFee] = useState([]);
  // chargement optimisé de la récupération de ma balance du wallet
  useEffect(() => {
    if (connectedAccount) {
      setLoading(true);
      getBalance(connectedAccount)
        .then((balance) => {
          setBalance(balance);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [connectedAccount]);

  // connection au wallet metamask
  const connectMetamask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setConnectedAccount(accounts[0]);
        getBalance(accounts[0]);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // récuperation de la balance du wallet metamask de l'user et affichage conversion eth
  const getBalance = async (connectedAccount) => {
    const web3 = new Web3(
      "https://mainnet.infura.io/v3/384d912916a74323b0d3d9583a77b8b9"
    );

    const balanceWallet = await web3.eth.getBalance(connectedAccount);
    return web3.utils.fromWei(balanceWallet, "ether");
  };

  // récuperation des tokens ERC20
  const fetchTokenList = async () => {
    try {
      const response = await fetch(
        "https://gateway.ipfs.io/ipns/tokens.uniswap.org"
      );
      const tokenListData = await response.json();
      const filteredToken = tokenListData.tokens.filter(
        (entry) => entry.chainId === 1
      );
      setTokenList(filteredToken);
      setLoadingList(false);
    } catch (error) {
      console.log(error.message);
      setLoadingList(true);
    }
  };

  useEffect(() => {
    fetchTokenList();
  }, []);

  // Récupération des prix via l'adresse des tokens
  const getPrice = async () => {
    if (!selectedItem || !selectedSecondItem) return;
    const amount = Number(current.from) * Math.pow(10, selectedItem[3]);
    console.log(amount);
    const params = new URLSearchParams({
      sellToken: selectedItem[2],
      buyToken: selectedSecondItem[2],
      sellAmount: amount,
    });
    const headers = { "0x-api-key": "f3226fc9-8580-402d-851d-808413124d2b" };
    try {
      const response = await fetch(
        `https://api.0x.org/tx-relay/v1/swap/price?${params}`,
        { headers }
      );
      const tokenPriceResponse = await response.json();
      const convertedPrice =
        tokenPriceResponse.grossBuyAmount / Math.pow(10, selectedSecondItem[3]);
      const value = convertedPrice.toFixed(2);
      setTokenPrice(value);
      setGasFee(tokenPriceResponse.fees.gasFee.feeAmount);
      console.log(tokenPriceResponse);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPrice();
  }, [current, selectedItem, selectedSecondItem]);

  const handleSelectItem = (symbol, logo, address, decimals) => {
    setSelectedItem(symbol, logo, address, decimals);
    setIsOpenFirst(false);
  };

  const handleSecondSelectItem = (symbol, logo, address, decimals) => {
    setSelectedSecondItem(symbol, logo, address, decimals);
    setIsOpenSecond(false);
  };

  const handleInputChange = (event) => {
    setCurrent({
      ...current,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="container py-16">
        <div className="flex justify-between text-center">
          <Card className="bg-[#eeeeee] shadow-xl w-1/3">
            <CardHeader className="pb-3">
              <CardDescription className="text-xl t text-[#777]">
                Balance Available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center flex-col gap-3">
                <span className="text-black font-bold text-3xl">
                  {loading ? (
                    <p>Chargement...</p>
                  ) : error ? (
                    <p>Erreur: {error}</p>
                  ) : balance ? (
                    <p>{parseFloat(balance).toFixed(4)} ETH</p>
                  ) : null}
                </span>
                <div className="flex gap-3">
                  <Button className="bg-white text-black font-bold shadow-xl px-6">
                    Buy
                  </Button>
                  <Button className="bg-white text-black font-bold shadow-xl px-6">
                    Receive
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="bg-black rounded-2xl flex-col justify-center max-h-1/3 w-1/2 mt-16 flex p-3 gap-3">
          <div className="flex bg-[#1B1B1B] py-10 rounded-lg justify-between p-3 focus-within:border-white border border-transparent">
            <input
              type="number"
              value={current.from}
              name="from"
              onChange={handleInputChange}
              placeholder="0"
              className="rounded-xl w-full mr-3 max-h-[44px] text-3xl focus:outline-none text-white font-semibold bg-[#1B1B1B] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <Dialog open={isOpenFirst} onOpenChange={setIsOpenFirst}>
              <Button
                className="rounded-full bg-black hover:bg-neutral-800 font-bold text-xl"
                onClick={() => setIsOpenFirst(!isOpenFirst)}
              >
                {selectedItem.length > 0 ? (
                  <>
                    <img
                      className="mr-2 object-cover rounded-full"
                      src={selectedItem[1]}
                      alt={selectedItem[0]}
                      width={30}
                      height={30}
                      loading="lazy"
                    />
                    <span>{selectedItem[0]}</span>
                    <ChevronDown className="ml-2" width={50} />
                  </>
                ) : (
                  <ChevronDown className="ml-3" />
                )}
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Coins</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-auto h-full">
                  <ul>
                    {loadingList ? (
                      <p>Loading...</p>
                    ) : (
                      tokenList.map((token, index) => {
                        return (
                          <li key={index}>
                            <div
                              className="flex cursor-pointer hover:bg-slate-300 py-3"
                              onClick={() => {
                                handleSelectItem([
                                  token.symbol,
                                  token.logoURI,
                                  token.address,
                                  token.decimals,
                                ]);
                              }}
                            >
                              <img
                                src={token.logoURI}
                                alt={token.symbol}
                                className="mr-3 rounded-full object-cover"
                                loading="lazy"
                                width={30}
                                height={30}
                              />
                              <span>{token.symbol}</span>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex bg-[#1B1B1B] py-10 rounded-lg p-3 focus-within:border-white border border-transparent">
            <input
              type="number"
              value={current.to > 0 ? current.to : tokenPrice}
              name="to"
              onChange={handleInputChange}
              placeholder="0"
              className="rounded-xl w-full mr-3 max-h-[44px] text-3xl outline-none text-white font-semibold bg-[#1B1B1B] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Dialog open={isOpenSecond} onOpenChange={setIsOpenSecond}>
              <Button
                className="rounded-full font-bold bg-[#FC72FF] hover:bg-[#fd72ffdb] text-lg"
                onClick={() => setIsOpenSecond(!isOpenSecond)}
              >
                {selectedSecondItem.length > 0 ? (
                  <>
                    <img
                      className="mr-2 object-cover rounded-full"
                      src={selectedSecondItem[1]}
                      alt={selectedSecondItem[0]}
                      width={30}
                      height={30}
                      loading="lazy"
                    />
                    <span>{selectedSecondItem[0]}</span>
                    <ChevronDown className="ml-2" width={50} />
                  </>
                ) : (
                  <>
                    <span>Sélectionnez le jeton</span>
                    <ChevronDown width={50} />
                  </>
                )}
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Coins</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-auto h-full">
                  <ul>
                    {loadingList ? (
                      <p>Loading...</p>
                    ) : (
                      tokenList.map((token, index) => {
                        return (
                          <li key={index}>
                            <div
                              className="flex cursor-pointer hover:bg-slate-300 py-3"
                              onClick={() => {
                                handleSecondSelectItem([
                                  token.symbol,
                                  token.logoURI,
                                  token.address,
                                  token.decimals,
                                ]);
                              }}
                            >
                              <img
                                src={token.logoURI}
                                alt={token.symbol}
                                className="mr-3 rounded-full object-cover"
                                loading="lazy"
                                width={30}
                                height={30}
                              />
                              <span>{token.symbol}</span>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-white">Estimated Gas: {gasFee}</p>
          {connectedAccount ? (
            ""
          ) : (
            <Button
              onClick={connectMetamask}
              className="w-full py-8 font-bold text-lg bg-[#311C31] hover:bg-[#432643] text-[#FC72FF]"
            >
              Connecter MetaMask
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
