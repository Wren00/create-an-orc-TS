import { useEffect, useState } from "react";
import ApiClient from "../utils";

export const DisplayOrcName = () => {

    // displays the generated name for the Orc
    const name = useFetchOrcName()

    //use a ternary operator to decide whether name exists (not null)
    // charAt(0) → get the first character
    // .toUpperCase() → make it uppercase
    // slice(1) → get the rest of the string
    // fallback string if name does not exist

    return (<div>
        <p>{name ? name.charAt(0).toUpperCase() + name.slice(1) : "Loading..."}</p>
    </div>)
}

// custom hook for getting the name!

export function useFetchOrcName(): string | null {
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        const fetchName = async () => {
            try {
                const { data } = await ApiClient.get('/gen');
                const rawName = typeof data === 'string' ? data : data.name;
                const cleaned = String(rawName);
                setName(cleaned);
            } catch {
                setName("???");
            }
        };

        fetchName();
    }, []);

    return name;
}
