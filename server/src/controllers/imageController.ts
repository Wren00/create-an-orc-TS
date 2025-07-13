import {Request, Response} from "express";
import { ImageService} from "../services/imageService";

const getImages = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("controller hit");
        const urlArray : string[] = await ImageService.getOrcImageArray();
        res.status(200).json({ images: urlArray });
    } catch (error) {
        console.error("Error fetching images to array: ", error);
        res.status(500).json({ message: "Could not retrieve images."});
    }
}

const ImageController = {
    getImages
};


export { ImageController };