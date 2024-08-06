import { ProductData } from "@/data/ProductsData";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
    productInfo,
}: {
    productInfo: ProductData;
}) {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(productInfo.ratingAndCount[0])) {
            stars.push(
                <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-400"
                    key={i}
                ></FontAwesomeIcon>
            );
        } else {
            stars.push(
                <FontAwesomeIcon icon={faStar} key={i}></FontAwesomeIcon>
            );
        }
    }

    return (
        <div className="product-card border-2 border-gray-300 py-2 px-2 flex flex-col items-center rounded-sm">
            <Image
                src={productInfo.imagePath}
                alt={productInfo.name}
                className="w-[200px] h-[250px] mb-4 rounded-md"
            ></Image>

            <p className="text-xl text-center">{productInfo.name}</p>

            <div className="flex flex-col items-center justify-between py-2 px-2">
                <div className="flex flex-col text-lg md:text-xl text-gray-700">
                    <div className="relative mb-2 flex flex-col items-center">
                        <div className="flex flex-col md:flex-row md:mb-1 items-center justify-center text-sm">
                            <div>{stars}</div>
                            <p className="ml-1">
                                ({productInfo.ratingAndCount[1]})
                            </p>
                        </div>

                        <p className="text-center mt-1 text-lg md:text-xl">
                            {productInfo.price}
                            TL
                        </p>
                    </div>
                </div>
                <Link
                    href={`/urunler/${productInfo.name}`}
                    className="bg-blue-600 text-white text-xl py-1 px-8 rounded-sm hover:bg-blue-700 duration-150 font-bold"
                >
                    Ürüne git
                </Link>
            </div>
        </div>
    );
}
