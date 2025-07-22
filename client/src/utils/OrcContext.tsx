import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { GenerateOrc } from "../../../common/interfaces/orc";
import ApiClient from "./api-client";
import { useRef } from "react";

interface OrcContextType {
    orcData: GenerateOrc | null;
    setOrcData: React.Dispatch<React.SetStateAction<GenerateOrc | null>>;
    loading: boolean;
}

const OrcContext = createContext<OrcContextType | null>(null);

export const OrcProvider = ({ children }: { children: ReactNode }) => {
    const [orcData, setOrcData] = useState<GenerateOrc | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        const fetchOrc = async () => {
            try {
                setLoading(true);
                const { data } = await ApiClient.get("/gen");
                setOrcData(data);
            } catch (error) {
                console.error("Failed to fetch orc data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrc();
    }, []);

    return (
        <OrcContext.Provider value={{ orcData, setOrcData, loading }}>
            {children}
        </OrcContext.Provider>
    );
};

export const useOrcContext = () => {
    const context = useContext(OrcContext);
    if (!context) throw new Error("useOrc must be used within OrcProvider");
    return context;
};