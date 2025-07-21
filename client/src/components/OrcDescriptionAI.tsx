import { useEffect, useState } from "react";
import ApiClient from "../utils";

export const GenerateDescription = () => {
    const [story, setStory] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await ApiClient.get("/gen/story");

                const newStory =
                    typeof data === "string"
                        ? data
                        : typeof data?.description === "string"
                            ? data.description
                            : "???";

                setStory((prev) => (prev !== newStory ? newStory : prev));
            } catch (error) {
                console.error("Failed to fetch story:", error);
                setStory("???");
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <p className="orc-description">{story}</p>
        </div>
    );
}