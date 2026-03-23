import { Product } from "../lib/api/products";
import ProductCard from "../ui/ProductCard";

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  const remainder = products.length % 3;
  const fillers = remainder === 0 ? 0 : 3 - remainder;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary border-b border-primary mt-[230px] lg:mt-[246px]">
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

      {Array.from({ length: fillers }).map((_, i) => (
        <div key={`filler-${i}`} className="size-full bg-background"></div>
      ))}
    </div>
  );
}
