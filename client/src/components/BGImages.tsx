import { useFetchData } from "../hooks/useFetchData";

export const DisplayBGImages = () => {
    const { data, loading, error } = useFetchData<{ images: string[] }>("/images/bg");

    if (loading) return <p>Loading images...</p>;
    if (error || !data || !Array.isArray(data.images)) return <p>Error loading images</p>;

    const [bg, shadow, border] = data.images;

    return (
        <div>
            <img src={bg} className="background" alt="cosmic background" />
            <img src={shadow} className="orc-shadow" alt="orc shadow" />
            <img src={border} className="border" alt="image border" />
        </div>
    );
};

