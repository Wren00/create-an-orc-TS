import { ApiClient} from "../utils";
import {useEffect, useState} from "react";


export const GenerateName = () => {
    const [name, setName] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const { data: response } = await ApiClient.get(
                `/gen`
            );
            console.log(response);
            setName(response);
        };
        fetchData();
    }, []);

    return <h1>Name: {name}</h1>;
}
