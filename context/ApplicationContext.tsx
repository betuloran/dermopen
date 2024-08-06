"use client";

import { ProductData } from "@/data/ProductsData";
import { createContext, useEffect, useState } from "react";

interface ApplicationContextInterface {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    basketItems: ProductData[] | null;
    setBasketItems: React.Dispatch<React.SetStateAction<ProductData[] | null>>;
}

export const ApplicationContext =
    createContext<null | ApplicationContextInterface>(null);

export default function ApplicationContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [basketItems, setBasketItems] = useState<ProductData[] | null>(null);

    useEffect(() => {
        if (localStorage.getItem("basketItems")) {
            setBasketItems(
                JSON.parse(localStorage.getItem("basketItems") || "")
            );
        }
    }, []);

    return (
        <ApplicationContext.Provider
            value={{ basketItems, setBasketItems, isMenuOpen, setIsMenuOpen }}
        >
            {children}
        </ApplicationContext.Provider>
    );
}
