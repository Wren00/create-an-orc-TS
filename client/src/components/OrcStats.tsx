import {useEffect, useState} from "react";
import ApiClient from "../utils";
import {OrcStats} from "../../../common/interfaces/orc";

export const GenerateStats = () => {
    const [stats, setStats] = useState<OrcStats | null>(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data } = await ApiClient.get("/orcs/1");

                const orcStats : OrcStats = {
                    str: data.str,
                    dex: data.dex,
                    con: data.con,
                    int: data.int,
                    wis: data.wis,
                    cha: data.cha,
                }
                setStats((prev) => (prev !== orcStats ? orcStats : prev));
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };

        fetchData();
    }, []);

    if (!stats) return null; // Or a <p>Loading...</p>

    return (
        <div className="orc-stats">
            <p className="orc-str">STR: {stats.str}</p>
            <p className="orc-dex">DEX: {stats.dex}</p>
            <p className="orc-con">CON: {stats.con}</p>
            <p className="orc-int">INT: {stats.int}</p>
            <p className="orc-wis">WIS: {stats.wis}</p>
            <p className="orc-cha">CHA: {stats.cha}</p>
        </div>
    );
};