import { useEffect, useState } from "react";
import { useCryptoStore } from "@/zustand/store";

export default function FetchCrypto(url) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsync = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        useCryptoStore.setState({ cryptos: data });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchAsync();
  }, [url]);

  return { loading };
}
