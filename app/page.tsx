import BestSellerProducts from "@/components/UI/BestSellerProducts";
import DiscountProducts from "@/components/UI/DiscountProducts";
import NewProducts from "@/components/UI/NewProducts";

export default function HomePage(){


    return <main className="min-h-screen">

        <DiscountProducts></DiscountProducts>
        <BestSellerProducts></BestSellerProducts>
        <NewProducts></NewProducts>

    </main>
}