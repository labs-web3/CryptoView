import { useEffect, useState } from "react";

export default function FetchCrypto(url) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsync = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchAsync();
  }, [url]);

  return { posts, loading };
}
