"use client";

import { useState } from "react";

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

interface BuyAssetProps {
  Asset: CryptoAsset;
}

function BuyAsset({ Asset }: BuyAssetProps) {

  const [buy, setBuy] = useState(true);
  const [amountInSek, setAmountInSek] = useState("");

  const calculateUnits = amountInSek === "" ? "" : (parseFloat(amountInSek) / (Asset.priceSek ? parseFloat(Asset.priceSek) : 1));

  return (
    <div className="bg-gray-500/10 p-4 w-full rounded-md">
        <div className="text-xl font-bold mb-4 w-full flex justify-end">
            <button className={`w-[50%] p-2 cursor-pointer ${buy ? 'border-b-2 border-space-dark text-space-dark' : 'border-b-2 border-gray-400 text-gray-400'}`} onClick={() => setBuy(true)}>
              Köp
            </button>
            <button className={`w-[50%] p-2 cursor-pointer ${!buy ? 'border-b-2 border-space-dark text-space-dark' : 'border-b-2 border-gray-400 text-gray-400'}`} onClick={() => setBuy(false)}>
              Sälj
            </button>
        </div>
        <form>
            <div className="border-b border-gray-400 pb-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-1">Belopp</label>
                    <input type="text" id="amount" name="amount" onChange={(e) => setAmountInSek(e.target.value)} className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-space-teal" placeholder="Ange belopp i SEK" />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium mb-1 mt-4">Pris per enhet</label>
                    <input type="text" id="price" name="price" value={calculateUnits} className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-space-teal" />
                </div>
            </div>
        </form>
    </div>
  );
}

export default BuyAsset;