"use client";

import { ApplicationContext } from "@/context/ApplicationContext";
import { AuthContext } from "@/context/AuthContext";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function MenuBar() {
    const applicationContext = useContext(ApplicationContext);
    const authContext = useContext(AuthContext);
    const router = useRouter();

    return (
        <div className="menu-bar-overlay absolute top-0 left-0 z-[1000] w-full flex flex-col gap-4 text-2xl font-semibold text-gray-700 items-center justify-center h-[100%] bg-opacity-70 backdrop-blur-sm bg-white ">
            <ul className="text-center flex flex-col gap-4">
                {!authContext?.user && (
                    <>
                        <li>
                            <Link
                                onClick={() => {
                                    applicationContext?.setIsMenuOpen(false);

                                    document.body.style.overflow = "initial";
                                }}
                                href={"/giris-yap"}
                            >
                                Giriş Yap
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => {
                                    applicationContext?.setIsMenuOpen(false);

                                    document.body.style.overflow = "initial";
                                }}
                                href={"/kayit-ol"}
                            >
                                Kayıt Ol
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => {
                                    applicationContext?.setIsMenuOpen(false);

                                    document.body.style.overflow = "initial";
                                }}
                                href={"/sepetim"}
                            >
                                Sepetim
                            </Link>
                        </li>
                    </>
                )}
                {authContext?.user && (
                    <>
                        <li>
                            <Link
                                onClick={() => {
                                    applicationContext?.setIsMenuOpen(false);

                                    document.body.style.overflow = "initial";
                                }}
                                href={"/profil"}
                            >
                                Profilim
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => {
                                    applicationContext?.setIsMenuOpen(false);

                                    document.body.style.overflow = "initial";
                                }}
                                href={"/sepetim"}
                            >
                                Sepetim
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => {
                                    applicationContext?.setIsMenuOpen(false);

                                    document.body.style.overflow = "initial";
                                }}
                                href={"/siparisler"}
                            >
                                Siparişlerim
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    applicationContext?.setIsMenuOpen(false);
                                    document.body.style.overflow = "initial";
                                    authContext.setUser(null);
                                    applicationContext?.setBasketItems(null);
                                    localStorage.removeItem("basketItems");
                                    localStorage.removeItem("userInfo");
                                    router.push("/");
                                }}
                            >
                                Çıkış Yap
                            </button>
                        </li>
                    </>
                )}
            </ul>

            <FontAwesomeIcon
                icon={faClose}
                className="absolute right-4 top-7 text-3xl"
                onClick={() => {
                    document.body.style.overflow = "initial";
                    applicationContext?.setIsMenuOpen(false);
                }}
            ></FontAwesomeIcon>
            <p className="text-sm text-gray-400 font-bold text-center absolute bottom-4">
                2024@ dermopen tüm hakları saklıdır.
            </p>
        </div>
    );
}
