"use server";

import { client } from "@/mongodb/connect";
import cream1 from "@/public/cream1.webp";
import cream2 from "@/public/cream2.jpeg";
import cream3 from "@/public/cream3.jpg";
import cream4 from "@/public/cream4.webp";
import cream5 from "@/public/cream5.webp";
import lotion1 from "@/public/lotion1.jpg";
import lotion2 from "@/public/lotion2.png";
import makeup1 from "@/public/makeup1.jpeg";
import makeup2 from "@/public/makeup2.jpeg";
import makeup3 from "@/public/makeup3.jpg";
import makeup4 from "@/public/makeup4.webp";
import perfume1 from "@/public/parfume1.jpg";
import perfume2 from "@/public/perfume2.jpg";
import perfume3 from "@/public/perfume3.webp";
import perfume4 from "@/public/perfume4.jpg";
import { StaticImageData } from "next/image";

export interface ProductData {
    name: string;
    price: number;
    ratingAndCount: [number, number];
    description: string;
    imagePath: StaticImageData;
    discountPercentage?: number;
    priceAfterDiscount?: number;
    amount?: number;
}

export default async function getProductsData() {
    const database = client.db("dermopen");
    const productsCollection = database.collection("products");
    let products: ProductData[] = await productsCollection.find({}).toArray();

    const imagePaths = [
        cream1,
        cream2,
        cream3,
        cream4,
        cream5,
        lotion1,
        lotion2,
        makeup1,
        makeup2,
        makeup3,
        makeup4,
        perfume1,
        perfume2,
        perfume3,
        perfume4,
    ];

    for (const index in imagePaths) {
        if (products[index]) {
            products[index].imagePath = imagePaths[index];
        }
    }

    products = JSON.parse(JSON.stringify(products));

    return products;
}
