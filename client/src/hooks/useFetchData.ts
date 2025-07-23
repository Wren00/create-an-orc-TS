import { useEffect, useState } from "react";
import ApiClient from "../utils/api-client";

//generic type so function can return different types of data depending on what's needed

export function useFetchData<T = any>(path: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const response = await ApiClient.get(path);
                setData(response.data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [path]);

    return { data, loading, error };
}