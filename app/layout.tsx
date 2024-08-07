import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import ProductsContextProvider from "@/context/ProductsContext";
import ApplicationContextProvider from "@/context/ApplicationContext";
import AuthContextProvider from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/UI/ToastProvider.";

export const metadata: Metadata = {
    title: "Dermopen Kozmetik Ürünleri",
    description:
        "Dermopen kozmetik ürünleri, mikroiğneleme teknolojisi ile cildinizi yeniler ve gençleştirir. Eşit cilt tonu, azalan kırışıklıklar ve genel cilt sağlığı için etkili çözümler sunar.",
    authors: [{ name: "Aytunç Demir" }],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr-TR">
            <body className="min-h-screen flex flex-col max-w-[90rem] mx-auto">
                <ToastProvider>
                    <AuthContextProvider>
                        <ApplicationContextProvider>
                            <ProductsContextProvider>
                                <Header></Header>
                                {children}

                                <Footer></Footer>
                            </ProductsContextProvider>
                        </ApplicationContextProvider>
                    </AuthContextProvider>
                </ToastProvider>
            </body>
        </html>
    );
}
