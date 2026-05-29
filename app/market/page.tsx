"use client";

import AssetTable from "@/components/market/AssetTable";
import { useState, useEffect } from "react";

interface CryptoAsset {
  id: string;
  coingeckoId: string;
  symbol: string;
  name: string;
  imageUrl: string;
  priceSek: string | null;
  change24h: string | null;
  priceUpdatedAt: Date | null;
  source: string;
}

function page() {

  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      
    const fetchAssets = async () => {
      try {
          const response = await fetch("/api/assets/prices");

          if(!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setAssets(data.data);

      } catch (error) {
          console.error("Error fetching assets:", error);
          setError("Kunde inte hämta prisdata.");
      } finally {
          setLoading(false);
      }
    };
    fetchAssets();

  }, []);

  if (loading) {
      return <p className="text-center mt-10">Laddar marknadsdata...</p>;
  }

  return (
    <div className="p-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-left lg:text-5xl">Marknad</h1>
        <p className="lg:text-xl">Här finner du realtidspriser för olika kryptovalutor.</p>
        <AssetTable assets={assets} />
        {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}

export default page;