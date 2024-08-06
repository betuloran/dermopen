"use client";

import Image from "next/image";
import dermopenLogo from "@/public/dermopen-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useContext } from "react";
import { ApplicationContext } from "@/context/ApplicationContext";
import MenuBar from "./MenuBar";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function Header() {
    const applicationContext = useContext(ApplicationContext);
    const pathName = usePathname();
    const authContext = useContext(AuthContext);
    const router = useRouter();

    return (
        <header className="main-header  px-4 py-8">
            {(pathName === "/kayit-ol" || pathName === "/giris-yap") && (
                <div className="sign-up-header py-6">
                    <Link href={"/"}>
                        <Image
                            src={dermopenLogo}
                            width={150}
                            height={60}
                            alt="dermopen logo"
                            className="mx-auto mb-4"
                        ></Image>
                        <div className="h-[1px] bg-blue-200"></div>
                    </Link>
                </div>
            )}

            {pathName !== "/kayit-ol" && pathName !== "/giris-yap" && (
                <div className="main-header-container flex items-center justify-between">
                    {applicationContext?.isMenuOpen && <MenuBar></MenuBar>}
                    <Link href={"/"}>
                        <Image
                            src={dermopenLogo}
                            width={150}
                            height={60}
                            alt="dermopen logo"
                        ></Image>
                    </Link>
                    <div className="icons flex lg:hidden items-center gap-4 text-slate-800">
                        {authContext?.user && (
                            <FontAwesomeIcon
                                icon={faUser}
                                className="w-6 h-6 cursor-pointer"
                                onClick={() => router.push("/profil")}
                            ></FontAwesomeIcon>
                        )}
                        <FontAwesomeIcon
                            icon={faBars}
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => {
                                document.body.style.overflow = "hidden";
                                window.scrollTo(0, 0);
                                document;
                                applicationContext?.setIsMenuOpen(true);
                            }}
                        ></FontAwesomeIcon>
                    </div>
                    <div className="links hidden lg:flex items-center md:text-xl gap-4">
                        {authContext?.user && (
                            <>
                                <Link href={"/profil"}>Profil</Link>
                                <Link href={"/sepetim"}>Sepetim</Link>
                                <Link href={"/siparisler"}>Siparişlerim</Link>
                                <button
                                    onClick={() => {
                                        document.body.style.overflow =
                                            "initial";
                                        authContext.setUser(null);
                                        applicationContext?.setBasketItems(
                                            null
                                        );
                                        localStorage.removeItem("basketItems");
                                        localStorage.removeItem("userInfo");
                                        router.push("/");
                                    }}
                                >
                                    Çıkış Yap
                                </button>
                            </>
                        )}
                        {!authContext?.user && (
                            <div className="text-lg flex items-center gap-4">
                                <Link href={"/giris-yap"}>Giriş Yap</Link>
                                <Link href={"/kayit-ol"}>Kayıt Ol</Link>
                                <Link href={"/sepetim"}>
                                    Sepetim{" "}
                                    {applicationContext?.basketItems?.length !== undefined && applicationContext?.basketItems?.length !==
                                    0
                                        ? `(${applicationContext?.basketItems?.length})`
                                        : null}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
