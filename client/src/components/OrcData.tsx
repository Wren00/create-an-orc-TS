import { useEffect, useState } from "react";
import ApiClient from "../utils";

export const GenerateOrc = () => {
    // name: string;
    // description: string;
    // promptsCollectionId: number;
    // orcImagesId: number;
    // userId: number;

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await ApiClient.get("/gen");

                const rawName = typeof data === "string" ? data : data.name;

                const formatted = rawName.charAt(0).toUpperCase() + rawName.slice(1);

                setName(formatted);
            } catch (error) {
                console.error("Failed to fetch name:", error);
                setName("???");
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await ApiClient.get("/orcs/1");

                const orcDesc = typeof data === "string" ? data : data.description;

                setDescription(orcDesc);
            } catch (error) {
                console.error("Failed to fetch description:", error);
                setDescription("???");
            }
        };

        fetchData();
    }, []);

    return (<p>{name}{description}</p>)
}
