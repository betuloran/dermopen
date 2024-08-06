"use client";

import { ApplicationContext } from "@/context/ApplicationContext";
import { AuthContext } from "@/context/AuthContext";
import { ProductData } from "@/data/ProductsData";
import {
    faArrowAltCircleDown,
    faArrowDown,
    faArrowUp,
    faBasketShopping,
    faCartShopping,
    faCircleArrowDown,
    faCircleArrowUp,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import Modal from "react-modal";

export default function BasketPage() {
    const authContext = useContext(AuthContext);
    const applicationContext = useContext(ApplicationContext);
    const [basketVerified, setBasketVerified] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [modal, setModal] = useState<boolean>(false);
    useEffect(() => {
        if (applicationContext?.basketItems) {
            let totalBasketPrice = 0;

            for (const basketItem of applicationContext.basketItems) {
                if (basketItem.amount) {
                    totalBasketPrice +=
                        basketItem.amount *
                        (basketItem.priceAfterDiscount
                            ? basketItem.priceAfterDiscount
                            : basketItem.price);
                }
            }

            setTotalPrice(Math.floor(totalBasketPrice));
        }
    }, [applicationContext?.basketItems]);

    function basketHandler(e: FormEvent) {
        e.preventDefault();

        if (authContext?.user) {
            (async function () {
                await fetch("/api/siparisVer", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: authContext?.user?.email,
                        password: authContext?.user?.password,
                        orders: applicationContext?.basketItems,
                    }),
                });

                (async function () {
                    const res = await fetch("/api/girisYap", {
                        method: "POST",
                        body: localStorage.getItem("userInfo"),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const data = await res.json();
                    if (res.status === 200) {
                        authContext?.setUser(data.user);
                    }
                })();

                localStorage.removeItem("basketItems");
                applicationContext?.setBasketItems(null);
                setBasketVerified(true);
            })();
        } else {
            document.body.style.overflow = "hidden";
            setModal(true);
        }
    }

    return (
        <main>
            <section className="basket-section px-4 py-12">
                <div className="basket-container">
                    <header className="basket-header mb-4">
                        <h2 className="text-2xl">Sepetim</h2>
                        <div className="h-[1px] bg-gray-300 "></div>
                    </header>

                    {!applicationContext?.basketItems?.length &&
                        !basketVerified && (
                            <>
                                <div className="flex flex-col gap-2 justify-center">
                                    <FontAwesomeIcon
                                        icon={faCartShopping}
                                        className="text-gray-500 text-7xl mt-4 mb-6"
                                    ></FontAwesomeIcon>

                                    <p className="text-center text-xl text-gray-500">
                                        Sepetiniz şuanda boş gözüküyor :( <br />{" "}
                                    </p>
                                    <p className="text-center text-md text-gray-500">
                                        Alışverişe başlamak için{" "}
                                        <Link
                                            href={"/"}
                                            className="text-blue-500 hover:text-blue-600 duration-150"
                                        >
                                            {" "}
                                            buraya tıklayın.
                                        </Link>{" "}
                                    </p>
                                </div>
                            </>
                        )}
                    {applicationContext?.basketItems?.length !== undefined &&
                        applicationContext?.basketItems?.length > 0 &&
                        !basketVerified && (
                            <div className="basket-items flex flex-col gap-2 sm:grid sm:grid-cols-2">
                                {applicationContext.basketItems.map(
                                    (
                                        basketItem: ProductData,
                                        index: number
                                    ) => {
                                        return (
                                            <div
                                                className="border-2 border-gray-200 py-2 px-2 flex flex-col gap-4"
                                                key={index}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Image
                                                        src={
                                                            basketItem.imagePath
                                                        }
                                                        alt={basketItem.name}
                                                        width={100}
                                                        height={100}
                                                    ></Image>
                                                    <div className="text-lg text-gray-500 text-center">
                                                        <p>{basketItem.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center mt-4 mt-auto justify-between text-md px-4 text-center">
                                                    <div>
                                                        <p>
                                                            Fiyat:{" "}
                                                            {basketItem.priceAfterDiscount
                                                                ? basketItem.priceAfterDiscount
                                                                : basketItem.price}
                                                            TL
                                                        </p>
                                                        <p>
                                                            Toplam:{" "}
                                                            {basketItem.priceAfterDiscount
                                                                ? basketItem.priceAfterDiscount
                                                                : basketItem.price}
                                                            {basketItem.amount}
                                                            TL
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <p>
                                                            Adet:{" "}
                                                            {basketItem.amount
                                                                ? basketItem.amount
                                                                : 1}
                                                        </p>
                                                        <div className="buttons flex flex-col items-center text-sm">
                                                            <button
                                                                onClick={() =>
                                                                    applicationContext.setBasketItems(
                                                                        (
                                                                            prevState
                                                                        ) => {
                                                                            if (
                                                                                prevState
                                                                            ) {
                                                                                const newState =
                                                                                    [
                                                                                        ...prevState,
                                                                                    ];

                                                                                const foundedItem =
                                                                                    newState.find(
                                                                                        (
                                                                                            elem
                                                                                        ) =>
                                                                                            elem.name ===
                                                                                            basketItem.name
                                                                                    );

                                                                                if (
                                                                                    foundedItem !==
                                                                                        undefined &&
                                                                                    foundedItem.amount !==
                                                                                        undefined
                                                                                ) {
                                                                                    foundedItem.amount += 1;
                                                                                }

                                                                                return newState;
                                                                            } else
                                                                                return null;
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faArrowUp
                                                                    }
                                                                ></FontAwesomeIcon>
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    if (
                                                                        basketItem.amount !==
                                                                            undefined &&
                                                                        basketItem.amount >
                                                                            0
                                                                    ) {
                                                                        applicationContext.setBasketItems(
                                                                            (
                                                                                prevState
                                                                            ) => {
                                                                                if (
                                                                                    prevState
                                                                                ) {
                                                                                    const newState =
                                                                                        [
                                                                                            ...prevState,
                                                                                        ];

                                                                                    const foundedItem =
                                                                                        newState.find(
                                                                                            (
                                                                                                elem
                                                                                            ) =>
                                                                                                elem.name ===
                                                                                                basketItem.name
                                                                                        );

                                                                                    if (
                                                                                        foundedItem !==
                                                                                            undefined &&
                                                                                        foundedItem.amount !==
                                                                                            undefined
                                                                                    ) {
                                                                                        foundedItem.amount -= 1;
                                                                                    }

                                                                                    for (
                                                                                        let i = 0;
                                                                                        i <
                                                                                        newState.length;
                                                                                        i++
                                                                                    ) {
                                                                                        if (
                                                                                            newState[
                                                                                                i
                                                                                            ]
                                                                                                .amount ===
                                                                                            0
                                                                                        ) {
                                                                                            console.log(
                                                                                                "i",
                                                                                                i
                                                                                            );
                                                                                            newState.splice(
                                                                                                i,
                                                                                                1
                                                                                            );
                                                                                        }
                                                                                    }

                                                                                    return newState;
                                                                                } else
                                                                                    return null;
                                                                            }
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faArrowDown
                                                                    }
                                                                ></FontAwesomeIcon>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        )}
                    {applicationContext?.basketItems?.length &&
                        applicationContext?.basketItems?.length > 0 &&
                        !basketVerified && (
                            <div className="flex flex-col gap-4 items-center justify-center">
                                {" "}
                                <p className="text-center text-xl text-gray-400 mt-4">
                                    Toplam: {totalPrice}TL
                                </p>
                                <button
                                    type="button"
                                    onClick={basketHandler}
                                    className="py-2 px-8 bg-blue-500 hover:bg-blue-600 duration-150 text-white text-lg font-semibold"
                                >
                                    Sepeti Onayla
                                </button>
                                <Modal
                                    ariaHideApp={false}
                                    isOpen={modal}
                                    onRequestClose={() => {
                                        document.body.style.overflow =
                                            "initial";

                                        setModal(false);
                                    }}
                                    style={{
                                        content: {
                                            top: "50%",
                                            left: "50%",
                                            bottom: "auto",
                                            transform: "translate(-50%, -50%)",
                                            width: "90%",
                                        },
                                    }}
                                >
                                    <div className="text-lg text-center py-3">
                                        Siparişinizi onaylamak için öncelikle
                                        bir hesaba ihtiyacınız var,{" "}
                                        <Link
                                            href={"/giris-yap"}
                                            className="text-blue-600 duration-150 hover:text-blue-700"
                                        >
                                            giriş yapın
                                        </Link>{" "}
                                        veya{" "}
                                        <Link
                                            href={"/kayit-ol"}
                                            className="text-blue-600 duration-150 hover:text-blue-700"
                                        >
                                            kayıt olun
                                        </Link>
                                    </div>
                                </Modal>
                            </div>
                        )}
                    {basketVerified && (
                        <>
                            <div className="flex flex-col gap-2 justify-center">
                                <FontAwesomeIcon
                                    icon={faCircleCheck}
                                    className="text-green-500 text-7xl mt-4 mb-6"
                                ></FontAwesomeIcon>

                                <p className="text-center text-xl text-gray-500">
                                    Siparişiniz başarıyla alınmıştır <br />{" "}
                                </p>
                                <p className="text-center text-md text-gray-500">
                                    Siparişlerinizi görüntelemek için{" "}
                                    <Link
                                        href={"/siparisler"}
                                        className="text-blue-500 hover:text-blue-600 duration-150"
                                    >
                                        {" "}
                                        buraya tıklayın.
                                    </Link>{" "}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
