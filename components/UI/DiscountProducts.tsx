"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { ProductsContext } from "@/context/ProductsContext";
import Image from "next/image";
import { useContext } from "react";
import makeUnique from "@/utils/makeUnique";
import Link from "next/link";

export default function DiscountProducts() {
    const productsContext = useContext(ProductsContext);

    const randomProductNumbers = makeUnique([
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15),
    ]);

    randomProductNumbers.forEach((randomProductNumber: number) => {
        const randomProduct = productsContext?.[randomProductNumber];

        if (randomProduct) {
            randomProduct.discountPercentage = Math.floor(
                ((Math.random() * 100) % 70) + 10
            );
            randomProduct.priceAfterDiscount =
                Math.floor(
                    (randomProduct.price * randomProduct.discountPercentage) /
                        100
                ) + 0.99;
        }
    });

    return (
        <section className="discount-products-section py-12 px-4 -z-10">
            {productsContext && (
                <div className="discount-products-container">
                    <header className="discount-products-header text-center text-2xl md:text-3xl mb-8">
                        <h1> Haftanın Fırsatları</h1>
                    </header>

                    <Carousel
                        autoPlay={true}
                        showStatus={false}
                        showIndicators={false}
                        interval={2500}
                        infiniteLoop={true}
                        showThumbs={false}
                        stopOnHover={false}
                    >
                        {randomProductNumbers.map(
                            (randomProductNumber: number) => {
                                if (productsContext[randomProductNumber]) {
                                    return (
                                        <div
                                            key={randomProductNumber}
                                            className="relative border rounded-lg  border-gray-300 py-4 px-4 max-w-[42rem] mx-auto"
                                        >
                                            <div className="relative overflow-hidden">
                                                <Image
                                                    src={
                                                        productsContext[
                                                            randomProductNumber
                                                        ].imagePath
                                                    }
                                                    alt={`${productsContext[randomProductNumber].name}`}
                                                    className="w-[250px] h-[320px] mb-6 rounded-lg"
                                                ></Image>
                                                <span className="absolute top-7 -left-[50px] rotate-[-45deg] w-[200px] mx-auto bg-red-500 py-1 px-2 flex items-center justify-center  text-xl font-bold text-yellow-400">
                                                    <p>
                                                        -%
                                                        {
                                                            productsContext[
                                                                randomProductNumber
                                                            ].discountPercentage
                                                        }
                                                    </p>
                                                </span>
                                            </div>

                                            <p className="text-xl text-center text-black">
                                                {
                                                    productsContext[
                                                        randomProductNumber
                                                    ].name
                                                }
                                            </p>

                                            <div className="flex items-center justify-between py-2 px-2 gap-2">
                                                <Link
                                                    href={`urunler/${productsContext[randomProductNumber].name}`}
                                                    className="bg-blue-600 text-white text-xl py-1 px-10 rounded-sm hover:bg-blue-700 duration-150 font-bold"
                                                >
                                                    Ürüne git
                                                </Link>
                                                <div className="flex flex-col text-lg text-gray-700">
                                                    <div className="relative">
                                                        <p className="">
                                                            {
                                                                productsContext[
                                                                    randomProductNumber
                                                                ].price
                                                            }
                                                            TL
                                                        </p>
                                                        <div className="absolute left-0 top-[50%] w-full h-[2px]  bg-gray-400"></div>
                                                    </div>
                                                    <p className="text-black">
                                                        {
                                                            productsContext[
                                                                randomProductNumber
                                                            ].priceAfterDiscount
                                                        }
                                                        TL
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return <div key={randomProductNumber}></div>;
                            }
                        )}
                    </Carousel>
                </div>
            )}
        </section>
    );
}
