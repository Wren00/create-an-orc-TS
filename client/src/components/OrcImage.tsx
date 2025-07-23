import { useFetchData } from "../hooks/useFetchData";

export const DisplayOrcImages = () => {
    const { data, loading, error } = useFetchData<{ images: string[] }>("/images");

    if (loading) return <p>Loading images...</p>;
    if (error || !data || !Array.isArray(data.images)) return <p>Error loading images</p>;

    const [head, torso, legs] = data.images;

    return (
        <div>
            <img src={head} alt="head" />
            <img src={torso} alt="torso" />
            <img src={legs} alt="legs" />
        </div>
    );
};


