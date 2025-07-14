import { useEffect, useState } from "react";
import ApiClient from "../utils";


export const DisplayOrcImages = () => {


    const images : string[] = useFetchImages();

    return (<div>
        <p><img src= {images.at(0)?.toString()} alt="head"/></p>
        <p><img src= {images.at(1)?.toString()} alt="torso" /></p>
        <p><img src= {images.at(2)?.toString()} alt="legs" /></p>
    </div>)
}

// custom hook for getting the images

export function useFetchImages(): string[] {
    const [images, setImages] = useState<string[] | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await ApiClient.get("/images");
                const imageData = response.data;

                if (
                    /// check imageData is an Array
                    Array.isArray(imageData.images) &&
                    imageData.images.every((img :string) => true)
                ) {
                    setImages(imageData.images);
                } else {
                    console.error("Unexpected image format:", imageData);
                    setImages(["???"]);
                }
            } catch (err) {
                console.error("Failed to fetch images:", err);
                setImages(["???"]);
            }
        };

        fetchImages();
    }, []);

    if(images !== null) {
        return images;
    } else {
        return (["???"]);
    }
}