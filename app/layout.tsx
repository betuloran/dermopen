import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import ProductsContextProvider from "@/context/ProductsContext";
import ApplicationContextProvider from "@/context/ApplicationContext";
import AuthContextProvider from "@/context/AuthContext";

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
                <AuthContextProvider>
                    <ApplicationContextProvider>
                        <ProductsContextProvider>
                            <Header></Header>
                            {children}

                            <Footer></Footer>
                        </ProductsContextProvider>
                    </ApplicationContextProvider>
                </AuthContextProvider>
            </body>
        </html>
    );
}
