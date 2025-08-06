import { useOrcContext } from "../utils/OrcContext";

export const  OrcBackstory  = () => {
    const { orcData, loading } = useOrcContext();

    if (loading) return <p>Loading story...</p>;
    if (!orcData) return <p>No Orc data.</p>;

    return <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full">
        {orcData.description}
            </div>;
}