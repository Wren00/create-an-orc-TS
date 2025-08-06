import { useOrcContext } from "../utils/OrcContext";

export const  OrcStats  = () => {
    const { orcData, loading } = useOrcContext();

    if (loading) return <p>Loading stats...</p>;
    if (!orcData) return <p>No Orc data.</p>;

    return <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p>STR:{orcData.str}</p>
        <p>DEX:{orcData.dex}</p>
        <p>CON:{orcData.con}</p>
        <p>INT:{orcData.int}</p>
        <p>WIS:{orcData.wis}</p>
        <p>CHA:{orcData.cha}</p>
    </div>;
}