import { useEffect, useState } from "react";
import ApiClient from "../utils";

export const GenerateName = () => {

    // returns a name for the Orc

    const [name, setName] = useState<string>("Loading...");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await ApiClient.get("/gen");

                const rawName : string = typeof data === "string" ? data : data.name;

                const formatted = rawName.charAt(0).toUpperCase() + rawName.slice(1);

                setName(formatted);
            } catch (error) {
                console.error("Failed to fetch name:", error);
                setName("???");
            }
        };

        fetchData();
    }, []);

    return (<div>
        <p className="orc-name">{name}</p>
    </div>)
}
