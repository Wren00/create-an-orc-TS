import { useEffect, useState } from "react";
import ApiClient from "../utils";

export const GenerateDescription = () => {

    // returns a description for the Orc. Currently extracting test string from database but to be AI generated

    const [desc, setDesc] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await ApiClient.get("/orcs/1");

                setDesc(typeof data === "string" ? data : data.description);

            } catch (error) {
                console.error("Failed to fetch description:", error);
                setDesc("???");
                console.log("orc description is" + desc)

            }
        };

        fetchData();
    }, []);

    return (<div>
        <p className="orc-description">{desc}</p>
    </div>)
}