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
export default function MyAccount() {
  const [connectedAccount, setConnectedAccount] = useState();
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const getBalance = async (connectedAccount) => {
    const web3 = new Web3(
      "https://mainnet.infura.io/v3/384d912916a74323b0d3d9583a77b8b9"
    );

    const balanceWallet = await web3.eth.getBalance(connectedAccount);
    return web3.utils.fromWei(balanceWallet, "ether");
  };

  return (
    <>
      <div className="container py-16">
        <div className="flex flex-col mb-4 items-start">
          {connectedAccount ? (
            ""
          ) : (
            <Button onClick={connectMetamask}>Connecter MetaMask</Button>
          )}
        </div>
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
          <Card>
            <CardHeader></CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
