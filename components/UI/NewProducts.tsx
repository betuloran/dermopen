"use client";

import { ProductsContext } from "@/context/ProductsContext";
import makeUnique from "@/utils/makeUnique";
import { useContext } from "react";
import ProductCard from "./ProductCard";

export default function NewProducts() {
    const productsContext = useContext(ProductsContext);

    const randomProductNumbers = makeUnique([
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15),
    ]);

    return (
        <section className="new-products-section py-12 px-4">
            {productsContext && (
                <div className="new-products-container">
                    <header className="relative new-products-header text-left text-2xl lg:text-3xl mb-8">
                        <h1> Yeni Ürünler</h1>
                        <div className="h-[1px] bg-gray-200 w-full"></div>
                    </header>

                    <div className="new-products flex flex-col gap-6  md:grid md:grid-cols-2 lg:grid-cols-3">
                        {randomProductNumbers.map(
                            (randomProductNumber: number, index: number) => {
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
