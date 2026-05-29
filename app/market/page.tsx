import AssetTable from "@/components/market/AssetTable";

function page() {
  return (
    <div className="p-10">
        <h1 className="text-4xl font-bold text-left mt-20">Marknad</h1>
        <p>Här finner du realtidspriser för olika kryptovalutor.</p>
        <AssetTable />
    </div>
  );
}

export default page;