import { Product } from "../lib/api/products";
import ProductCard from "../ui/ProductCard";

type Props = {
  products: Product[];
  className?: string;
};

export default function ProductGrid({ products, className }: Props) {
  const tabletColumns = 2;
  const desktopColumns = 3;

  const remainderTablet = products.length % tabletColumns;
  const fillersTablet = remainderTablet === 0 ? 0 : tabletColumns - remainderTablet;

  const remainderDesktop = products.length % desktopColumns;
  const fillersDesktop = remainderDesktop === 0 ? 0 : desktopColumns - remainderDesktop;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary border-b border-primary ${className || ""}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          imageSrc={
            product.images?.product?.[0] ??
            "https://hotmodagency.com/wp-content/uploads/2022/08/placeholder-1-1.jpeg"
          }
          title={product.name}
          price={Number(product.price)}
          isNew={product.isNew}
        />
      ))}

      {Array.from({ length: fillersDesktop }).map((_, i) => (
        <div
          key={`desktop-filler-${i}`}
          className="size-full bg-background hidden lg:block"
        />
      ))}

      {Array.from({ length: fillersTablet }).map((_, i) => (
        <div
          key={`tablet-filler-${i}`}
          className="size-full bg-background hidden md:block lg:hidden"
        />
      ))}
    </div>
  );
}
