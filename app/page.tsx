import { Suspense } from "react";
import SectionHero from "@/src/components/SectionHero";
import BannerMarquee from "@/src/ui/BannerMarquee";
import FeaturedProductCard from "@/src/ui/FeatureProductCard";
import ProductCard from "@/src/ui/ProductCard";
import ProductGridSkeleton from "@/src/ui/ProductGridSkeleton";
import { getRandomProducts } from "@/src/lib/api/products";
import { Product } from "@/src/lib/api/products";

export const dynamic = "force-dynamic";

function ProductsLoader() {
  return <ProductGridSkeleton />;
}

async function FeaturedProducts() {
  const products: Product[] = await getRandomProducts(6);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary border-b border-primary">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
            imageSrc={product.images?.product?.[0] ?? "https://hotmodagency.com/wp-content/uploads/2022/08/placeholder-1-1.jpeg"}
          title={product.name}
          price={Number(product.price)}
          isNew={product.isNew}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SectionHero />
      <BannerMarquee text="Free Shipping for all orders over $ 500" />
      <div className="w-full py-20 px-[30px] flex justify-center border-y border-primary">
        <h2 className="text-3xl xl:text-6xl font-bold md:max-w-7xl text-center leading-11 xl:leading-[72px]">
          KŌRA is a carefully curated collection of minimalist designs, where
          each piece combines timeless elegance and functionality, perfect for
          enhancing modern spaces with purpose and style.
        </h2>
      </div>
      <Suspense fallback={<ProductsLoader />}>
        <FeaturedProducts />
      </Suspense>
      <BannerMarquee text="Subscribe for our Newsletter and get a 10% Discount" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-primary border-t border-b border-primary">
        <FeaturedProductCard
          href="store/bedroom"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T03958_Square_LowRes_04_b2feb722-8d75-489d-9636-64aa4117c2d8.jpg?v=1756217083&width=1080"
          btnText="Discover Bedroom"
        />
        <FeaturedProductCard
          href="store/livingroom"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04446_Lores_07.jpg?v=1759151557&width=1080"
          btnText="Discover Living Room"
        />
        <FeaturedProductCard
          href="store/diningroom"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04063_LowRes_06_2989c851-c6fa-49f1-9629-540be16b1dd4.jpg?v=1756218813&width=1080"
          btnText="Discover Dining Room"
        />
        <FeaturedProductCard
          href="store/desks"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T00819_LoRes_01_69b0f3df-a373-4c25-9870-2184700e7ef2.jpg?v=1756216365&width=1080"
          btnText="Discover Desks"
        />
      </div>
    </>
  );
}