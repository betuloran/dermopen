import { footerData } from "@/data/FooterData";
import { FooterColumn } from "@/data/FooterData";
import Image from "next/image";
import Link from "next/link";
import Logos from "@/public/payments.png";

export default function Footer() {
    return (
        <footer className="bg-blue-600 text-white py-4 px-2 mt-auto">
            <div className="footer-container flex flex-col gap-2 md:flex-row md:gap-8 md:text-lg lg:gap-12 lg:text-xl">
                {footerData.data.map(
                    (footerColumn: FooterColumn, index: number) => {
                        return (
                            <div className="mb-4" key={index}>
                                <h3 className="text-xl font-bold mb-2">
                                    {footerColumn.heading}
                                </h3>

                                {footerColumn.elements.map(
                                    (
                                        footerColumnElement: string,
                                        index: number
                                    ) => {
                                        let link = "/hakkimizda";

                                        switch (footerColumnElement) {
                                            case "E-katalog":
                                            case "Hakkımızda":
                                                link = "/hakkimizda";
                                                break;
                                            case "Mesafeli satış sözleşmesi":
                                                link =
                                                    "/mesafeli-satis-sozlesmesi";
                                                break;
                                            case "İade":
                                                link = "/iade-iptal-ve-degisim";
                                                break;
                                            default:
                                                break;
                                        }
                                        return (
                                            <Link
                                                className="block"
                                                href={link}
                                                key={index}
                                            >
                                                {footerColumnElement}
                                            </Link>
                                        );
                                    }
                                )}
                            </div>
                        );
                    }
                )}
                <Image src={Logos} alt="payments logos" width={250} height={25} className="ml-auto mt-auto h-8"></Image>
            </div>
        </footer>
    );
}
