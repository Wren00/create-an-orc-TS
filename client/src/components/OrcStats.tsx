import { useOrcContext } from "../utils/OrcContext";

export const  OrcStats  = () => {
    const { orcData, loading } = useOrcContext();

    if (loading) return <p>Loading stats...</p>;
    if (!orcData) return <p>No Orc data.</p>;

    return <div className="orc-stats">
        <p>STR:{orcData.str}</p>
        <p>DEX:{orcData.dex}</p>
        <p>CON:{orcData.con}</p>
        <p>INT:{orcData.int}</p>
        <p>WIS:{orcData.wis}</p>
        <p>CHA:{orcData.cha}</p>
    </div>;
}