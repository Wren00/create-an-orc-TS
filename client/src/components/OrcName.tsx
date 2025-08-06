import { useOrcContext } from "../utils/OrcContext";

export const  OrcName  = () => {
    const { orcData, loading } = useOrcContext();

    if (loading) return <p>Loading name...</p>;
    if (!orcData) return <p>No Orc data.</p>;

    const orcName =  orcData.name

    return <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full min-w-150">
        {orcName}
    </div>;
}