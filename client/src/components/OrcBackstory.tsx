import { useOrcContext } from "../utils/OrcContext";

export const  OrcBackstory  = () => {
    const { orcData, loading } = useOrcContext();

    if (loading) return <p>Loading story...</p>;
    if (!orcData) return <p>No Orc data.</p>;

    return <div className="orc-backstory">
        {orcData.description}
            </div>;
}