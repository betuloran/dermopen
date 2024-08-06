"use client";

import makeUnique from "@/utils/makeUnique";
import { ProductsContext } from "@/context/ProductsContext";
import { useContext } from "react";
import ProductCard from "./ProductCard";

export default function BestSellerProducts() {
    const productsContext = useContext(ProductsContext);

    const randomProductNumbers = makeUnique([
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15),
    ]);

    return (
        <section className="best-seller-products-section py-12 px-4">
            {productsContext && (
                <div className="best-seller-products-container">
                    <header className="best-seller-products-header text-left text-2xl lg:text-3xl mb-8">
                        <h1> Çok Satanlar</h1>
                        <div className="h-[1px] bg-gray-200 w-full"></div>
                    </header>

                    <div className="best-sellers flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {randomProductNumbers.map(
                            (randomProductNumber: number,index:number) => {
                                if (productsContext[randomProductNumber]) {
                                    return (
                                        <ProductCard
                                            key={index}
                                            productInfo={
                                                productsContext[
                                                    randomProductNumber
                                                ]
                                            }
                                        ></ProductCard>
                                    );
                                }

                                return null;
                            }
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
