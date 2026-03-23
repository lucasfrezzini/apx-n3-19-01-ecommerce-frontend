"use client";

import { FC, useState } from "react";
import { useAtom } from "jotai";
import ProductImageSlider from "../ui/ProductImageSlider";
import ProductAccordionItem from "../ui/ProductAccordion";
import Headings from "../ui/Headings";
import Button from "../ui/Button";
import GoBack from "../ui/GoBack";
import { addToCartAtom } from "@/src/store/cartAtoms";
import { openCartAtom } from "@/src/store/uiAtoms";

function sanitizeHTML(html: string): string {
  const allowedTags = ["p", "br", "b", "i", "em", "strong", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "span", "a"];
  let cleaned = html;
  
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  cleaned = cleaned.replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");
  cleaned = cleaned.replace(/javascript:/gi, "");
  
  return cleaned;
}

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  images?: {
    product: string[];
    dimensions?: string;
  };
  attributes?: Record<string, string | Record<string, string>>;
  stock?: number;
  available?: boolean;
};

interface Props {
  product: Product;
}

const SectionProductDetail: FC<Props> = ({ product }) => {
  const [open, setOpen] = useState<number | null>(0);
  const [, addToCart] = useAtom(addToCartAtom);
  const [, openCart] = useAtom(openCartAtom);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.images?.product?.[0] ?? "",
    });
    openCart();
  };

  // Convert attributes a lista
  const attributesList = Object.entries(product.attributes || {}).flatMap(
    ([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return Object.entries(value).map(([k, v]) => ({
          label: k,
          value: v,
        }));
      }

      return [{ label: key, value: String(value) }];
    },
  );

  return (
    <section className="w-full mt-[49px] md:h-[calc(100dvh-49px)] border-b border-primary">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        {/* LEFT COLUMN */}
        <div className="md:col-span-1 flex flex-col min-h-0 border-b md:border-b-0 md:border-r border-primary">
          <GoBack />

          <div className="flex flex-col flex-1 min-h-0">
            {/* TITLE */}
            <Headings variant="bold" size="xl" className="p-[30px]">
              {product.name}
            </Headings>

            <div className="mt-auto md:overflow-y-auto">
              <div className="divide-y divide-primary">
                {/* DESCRIPTION */}
                <ProductAccordionItem
                  title="DESCRIPTION"
                  isOpen={open === 0}
                  onClick={() => setOpen(open === 0 ? null : 0)}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHTML(product.description ?? ""),
                    }}
                  />
                </ProductAccordionItem>

                {/* DETAILS */}
                <ProductAccordionItem
                  title="DETAILS"
                  isOpen={open === 1}
                  onClick={() => setOpen(open === 1 ? null : 1)}
                >
                  <ul className="space-y-2">
                    {attributesList.map((attr, index) => (
                      <li key={index} className="prodList flex justify-between">
                        <span className="font-bold">{attr.label}</span>
                        <span>{attr.value}</span>
                      </li>
                    ))}
                  </ul>
                </ProductAccordionItem>

                {/* PRICE */}
                <div className="px-[30px] py-4 flex justify-between items-center">
                  <span className="font-bold">PRICE</span>
                  <span className="font-bold">${product.price}</span>
                </div>

                {/* ADD TO CART */}
                <div className="w-full px-[30px] py-4 flex justify-between items-center hover:bg-foreground transition">
                  <Button onClick={handleAddToCart}>Add to cart</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:col-span-2 p-[30px] min-h-0 order-first md:order-last">
          <ProductImageSlider images={product.images?.product ?? []} />
        </div>
      </div>
    </section>
  );
};

export default SectionProductDetail;
