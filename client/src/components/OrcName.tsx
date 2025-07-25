import { useOrcContext } from "../utils/OrcContext";

export const  OrcName  = () => {
    const { orcData, loading } = useOrcContext();

    if (loading) return <p>Loading name...</p>;
    if (!orcData) return <p>No Orc data.</p>;

    const orcName =  orcData.name.charAt(0).toUpperCase() + orcData.name.slice(1);

    return <div className="orc-name">
        {orcName}
    </div>;
}