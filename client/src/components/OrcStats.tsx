import { useOrcContext } from "../utils/OrcContext";

export const  OrcStats  = () => {
    const { orcData, loading } = useOrcContext();

    if (loading) return <p>Loading stats...</p>;
    if (!orcData) return <p>No Orc data.</p>;

    return <div className="orc-stats">
        <p>{orcData.str}</p>
        <p>{orcData.dex}</p>
        <p>{orcData.con}</p>
        <p>{orcData.int}</p>
        <p>{orcData.wis}</p>
        <p>{orcData.cha}</p>
    </div>;
}