"use client";

import getProductsData, { ProductData } from "@/data/ProductsData";
import { createContext, useEffect, useState } from "react";

interface ProductsContext {
    products: ProductData[];
}

export const ProductsContext = createContext<null | ProductData[]>(null);

export default function ProductsContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [productsData, setProductsData] = useState<null | ProductData[]>(
        null
    );

    useEffect(() => {
        (async function () {
            const productsData = await getProductsData();

            setProductsData(productsData);
        })();
    }, []);

    return (
        <ProductsContext.Provider value={productsData || null}>
            {children}
        </ProductsContext.Provider>
    );
}
