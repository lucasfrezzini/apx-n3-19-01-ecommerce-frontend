import SectionProductDetail from "@/components/sections/SectionProductDetail";
import ProductCard from "@/components/product/ProductCard";
import BannerMarquee from "@/components/common/BannerMarquee";
import { getProductById, getProductsByCategory, Product } from "@/src/lib/api/products";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const product = await getProductById(id);

  const relatedProducts: Product[] = product.category 
    ? await getProductsByCategory(product.category).catch(() => [])
    : [];

  const recommendations = relatedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  return (
    <>
      <SectionProductDetail product={product} />

      <BannerMarquee text="Free Shipping for all orders over $ 500" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary border-t border-b border-primary">
        {recommendations.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            imageSrc={p.images?.product?.[0] ?? "https://hotmodagency.com/wp-content/uploads/2022/08/placeholder-1-1.jpeg"}
            title={p.name}
            price={Number(p.price)}
            isNew={p.isNew}
          />
        ))}
      </div>
    </>
  );
}
