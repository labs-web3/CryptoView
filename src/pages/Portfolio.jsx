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
import { useState } from "react";
export default function MyAccount() {
  const [connectedAccount, setConnectedAccount] = useState();
  const [balance, setBalance] = useState();

  const web3 = new Web3(
    "https://mainnet.infura.io/v3/384d912916a74323b0d3d9583a77b8b9"
  );

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
      console.log(error);
    }
  };

  const getBalance = async (account) => {
    try {
      const balanceWallet = await web3.eth.getBalance(account);
      setBalance(web3.utils.fromWei(balanceWallet, "ether"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container py-16">
        <div className="flex flex-col mb-4 items-start">
          <Button onClick={() => connectMetamask()}>Connect my Wallet</Button>
          <span className="mt-4">{balance}</span>
        </div>
        <Card className="bg-[#eeeeee] shadow-xl">
          <CardHeader className="pb-3">
            <CardDescription className="text-xl t text-[#777]">
              Balance Available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <span className="text-black font-bold text-3xl">40000 $</span>
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
    </>
  );
}
