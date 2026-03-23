import ArrowRight from "@/src/icons/ArrowRight";
import Sparkles from "@/src/icons/Sparkles";
import BannerMarquee from "@/src/ui/BannerMarquee";
import Button from "@/src/ui/Button";
import ProductCard from "@/src/ui/ProductCard";
import Headings from "@/src/ui/Headings";
import FeaturedProductCard from "@/src/ui/FeatureProductCard";
import HeroSection from "@/src/components/SectionHero";

export default function Styleguide() {
  return (
    <>
      <div>
        <BannerMarquee text="Free Shipping for all orders over $ 500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary border-t border-b border-primary">
        <ProductCard
          id="contact-1"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04078_LowRes_07_36270a60-c30a-43eb-bc96-34973cb1e5e2.jpg?v=1756214755&width=1080"
          title="Otis - Mesa de comedor redonda para cuatro personas - Pecan"
          price={159.99}
          isNew
        />
        <ProductCard
          id="contact-2"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04000_square_lores_08.jpg?v=1756215852&width=1080"
          title="Otis - Mesa de comedor redonda para cuatro personas - Pecan"
          price={159.99}
          isNew
        />
        <ProductCard
          id="contact-3"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T03687_LowRes_10_f80ae609-1964-41bb-862d-068dfd887c0d.jpg?v=1756218981&width=1080"
          title="Murphy - Mueble - Verde/Natural"
          price={39.99}
          isNew
        />
        <ProductCard
          id="contact-4"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04328_LowRes_02_088a0e62-4453-41cd-b94f-0b11c6f85119.jpg?v=1756214300&width=1080"
          title="Murphy - Mueble - Verde/Natural"
          price={39.99}
          isNew
        />
        <ProductCard
          id="contact-5"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04327_Lowres_04.jpg?v=1756215389&width=1080"
          title="Deven - Mueble - Walnut"
          price={29.99}
          isNew
        />
        <ProductCard
          id="contact-6"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04373_loRes_02.jpg?v=1756215460&width=1080"
          title="Cove - Tres cajones - Midnight"
          price={49.99}
        />
      </div>
    </>
  );
}
