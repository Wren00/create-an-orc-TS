import { useEffect, useState } from "react";
import ApiClient from "../utils";

export const GenerateDescription = () => {
    const [desc, setDesc] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await ApiClient.get("/orcs/1");

                const newDesc =
                    typeof data === "string"
                        ? data
                        : typeof data?.description === "string"
                            ? data.description
                            : "???";

                setDesc((prev) => (prev !== newDesc ? newDesc : prev));
            } catch (error) {
                console.error("Failed to fetch description:", error);
                setDesc("???");
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <p className="orc-description">{desc}</p>
        </div>
    );
}