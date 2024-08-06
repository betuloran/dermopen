"use client";

import { AuthContext } from "@/context/AuthContext";
import { ProductData } from "@/data/ProductsData";
import Image from "next/image";
import { useContext } from "react";

export default function OrdersPage() {
    const authContext = useContext(AuthContext);

    return (
        <main className="mb-4">
            <section className="orders-section py-2 px-4 mt-4">
                <div className="orders-container">
                    <header className="orders-header">
                        <header className="basket-header mb-4">
                            <h2 className="text-2xl">Siparişlerim</h2>
                            <div className="h-[1px] bg-gray-300 "></div>
                        </header>
                    </header>

                    <div className="orders">
                        {authContext?.user?.orders && (
                            <>
                                {" "}
                                <div className="basket-items flex flex-col gap-2 md:grid md:grid-cols-2">
                                    {authContext.user.orders.map(
                                        (order: ProductData, index: number) => {
                                            return (
                                                <div
                                                    className="border-2 border-gray-200 py-2 px-2 flex flex-col gap-4"
                                                    key={index}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <Image
                                                            src={
                                                                order.imagePath
                                                            }
                                                            alt={order.name}
                                                            width={100}
                                                            height={100}
                                                        ></Image>
                                                        <div className="text-lg text-gray-500 text-center">
                                                            <p>{order.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center mt-auto justify-between text-md px-4 text-center">
                                                        <div>
                                                            <p>
                                                                Fiyat:{" "}
                                                                {order.priceAfterDiscount
                                                                    ? order.priceAfterDiscount
                                                                    : order.price}
                                                                TL
                                                            </p>
                                                            <p>
                                                                Toplam:
                                                                {(order.priceAfterDiscount
                                                                    ? order.priceAfterDiscount
                                                                    : order.price) *
                                                                    (order.amount
                                                                        ? order.amount
                                                                        : 1)}
                                                                TL
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <p>
                                                                Adet:{" "}
                                                                {order.amount
                                                                    ? order.amount
                                                                    : 1}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
