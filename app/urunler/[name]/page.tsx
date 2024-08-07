"use client";

import React from "react";
import { ApplicationContext } from "@/context/ApplicationContext";
import { AuthContext } from "@/context/AuthContext";
import { ProductsContext } from "@/context/ProductsContext";
import { ProductData } from "@/data/ProductsData";
import { faCheck, faShield, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import makeUnique from "@/utils/makeUnique";

export default function ProductsPage() {
    const authContext = useContext(AuthContext);
    const [product, setProduct] = useState<ProductData | undefined>(undefined);
    const params = useParams();
    const productsContext = useContext(ProductsContext);
    const applicationContext = useContext(ApplicationContext);
    const stars: JSX.Element[] = [];
    const [popup, setPopup] = useState<boolean>(false);

    const labels = [
        "En çok satan",
        "Yüksek müşteri memnuniyeti",
        "Kolay iade",
        "Hemen kapıda teslimat",
        "Ücretsiz kargo",
    ];

    const [randomLabelNumbers, setRandomLabelNumbers] = useState<
        number[] | null
    >(null);

    useEffect(() => {
        if (!randomLabelNumbers) {
            setRandomLabelNumbers(
                makeUnique(
                    [
                        Math.floor((Math.random() * 10) % 5),
                        Math.floor((Math.random() * 10) % 5),
                        Math.floor((Math.random() * 10) % 5),
                    ],
                    5
                )
            );
        }

        if (productsContext && params.name) {
            const product = productsContext.find(
                (productContextElement: ProductData) => {
                    return (
                        encodeURI(productContextElement.name) === params.name
                    );
                }
            );
            setProduct(product);
        }
    }, [productsContext, params.name]);

    if (product) {
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(product.ratingAndCount[0])) {
                stars.push(
                    <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-400"
                        key={i}
                    ></FontAwesomeIcon>
                );
            } else {
                stars.push(
                    <FontAwesomeIcon key={i} icon={faStar}></FontAwesomeIcon>
                );
            }
        }
    }

    const handleAddToBasket = () => {
        if (!product) return;

        if (!authContext?.user) {
            setPopup(true);
        }

        applicationContext?.setBasketItems(
            (prevState: ProductData[] | null) => {
                let updatedBasketItems;

                if (!prevState) {
                    updatedBasketItems = [product];
                } else {
                    const newState = [...prevState];
                    const existingProduct = newState.find(
                        (basketItem: ProductData) =>
                            basketItem.name === product.name
                    );

                    if (existingProduct) {
                        existingProduct.amount = existingProduct.amount
                            ? existingProduct.amount + 1
                            : 2;
                    } else {
                        newState.push({ ...product, amount: 1 });
                    }

                    updatedBasketItems = newState;
                }

                localStorage.setItem(
                    "basketItems",
                    JSON.stringify(updatedBasketItems)
                );
                toast(`${product.name} sepete eklendi.`);
                return updatedBasketItems;
            }
        );
    };


    return (
        <main className="min-h-screen">
            {product && (
                <section className="product-info-section py-12 px-4">
                    <div className="product-info-container">
                        <header className="sm:hidden relative new-products-header text-center text-2xl mb-4">
                            <h1>{product.name}</h1>
                        </header>

                        <div className="product-info sm:hidden flex flex-col items-center   py-4 px-2">
                            <Image
                                src={product.imagePath}
                                alt={product.name}
                                className="w-[300px] h-[400px] mb-2 rounded-lg border-2 border-gray-300"
                            ></Image>
                            <p className="text-2xl mb-1">{product.price}TL</p>
                            <p className="text-md mb-2">
                                {stars} ({product.ratingAndCount[0]}) (
                                {product.ratingAndCount[1]})
                            </p>

                            <button
                                onClick={handleAddToBasket}
                                className="bg-blue-600 hover:bg-blue-700 duration-150 mb-6 font-semibold text-xl text-white py-2 px-8"
                            >
                                Sepete Ekle
                            </button>

                            <div className="product-description">
                                <h3 className="text-lg mb-1">
                                    Ürün açıklaması:
                                </h3>
                                <p className="text-gray-700">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="hidden sm:flex mx-auto sm:flex-col  max-w-[90rem]  px-2 py-2">
                                <div className="flex gap-6">
                                    <Image
                                        src={product.imagePath}
                                        alt={product.name}
                                        className="border-2 border-gray-200 mb-0 w-[400px] h-[550px]  rounded-lg"
                                    ></Image>
                                    <div className="text-2xl flex flex-col">
                                        <h1>{product.name}</h1>
                                        <div className="text-lg">
                                            <p className="text-md">
                                                {stars} (
                                                {product.ratingAndCount[0]}) (
                                                {product.ratingAndCount[1]})
                                            </p>
                                            <p className="text-3xl mt-2">
                                                {" "}
                                                {product.priceAfterDiscount
                                                    ? product.priceAfterDiscount
                                                    : product.price}
                                                TL
                                            </p>
                                            <div className="flex flex-col gap-2 mt-2">
                                                {randomLabelNumbers?.map(
                                                    (
                                                        randomLabelnumber: number,
                                                        index: number
                                                    ) => {
                                                        console.log(
                                                            randomLabelnumber
                                                        );
                                                        return (
                                                            <div
                                                                className="flex items-center gap-1"
                                                                key={index}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCheck
                                                                    }
                                                                    className="text-gray-400 text-xl"
                                                                ></FontAwesomeIcon>
                                                                <p>
                                                                    {
                                                                        labels[
                                                                            randomLabelnumber
                                                                        ]
                                                                    }
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-auto flex flex-col justify-center">
                                            <button
                                                onClick={handleAddToBasket}
                                                className="bg-blue-600 hover:bg-blue-700 duration-150 mb-1 font-semibold text-xl text-white py-2 px-8"
                                            >
                                                Sepete Ekle
                                            </button>
                                        </div>
                                    </div>{" "}
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-2xl">Ürün Açıklaması</h1>
                                <div className="h-[1px] bg-gray-300 mb-2"></div>
                                <p className="text-gray-400 text-xl">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
