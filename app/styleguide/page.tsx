import ArrowRight from "@/src/icons/ArrowRight";
import Sparkles from "@/src/icons/Sparkles";
import BannerMarquee from "@/components/common/BannerMarquee";
import Button from "@/components/common/Button";
import ProductCard from "@/components/product/ProductCard";
import Headings from "@/components/common/Headings";
import FeaturedProductCard from "@/components/product/FeatureProductCard";
import SectionProductDetail from "@/components/sections/SectionProductDetail";

export default function Styleguide() {
  return (
    <>
      <div className="flex items-center justify-center">
        <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-[30px] sm:items-start">
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <Headings as="h1" variant="bold" size="xl" className="my-10">
              Styleguide KŌRA Ecommerce
            </Headings>
            <div className="w-full h-px bg-black my-12"></div>

            <Headings as="h2" size="xl" className="my-10">
              Buttons
            </Headings>

            <div className="flex gap-5">
              <Button>Click me</Button>
              <Button iconRight={<ArrowRight />}>Submit</Button>
              <Button variant="secondary" iconRight={<Sparkles />}>
                Like
              </Button>
            </div>
          </div>
          <div className="w-full h-px bg-black my-12"></div>
          <Headings as="h2" size="xl" className="my-10">
            Headings
          </Headings>
          <div className="flex flex-col gap-12">
            <Headings as="h2" variant="normal" size="md">
              Heading normal MD
            </Headings>
            <Headings as="h2" variant="normal" size="lg">
              Heading normal LG
            </Headings>
            <Headings as="h2" variant="normal" size="xl">
              Heading normal XL (Display)
            </Headings>
            <Headings as="h2" variant="bold" size="md">
              Heading bold MD
            </Headings>
            <Headings as="h2" variant="bold" size="lg">
              Heading bold LG
            </Headings>
            <Headings as="h1" variant="bold" size="xl">
              Heading bold XL (Display)
            </Headings>
          </div>
          <div className="w-full h-px bg-black my-12"></div>
          <Headings as="h2" size="xl" className="my-10">
            Text paragraph
          </Headings>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, officia dolor doloremque mollitia rerum, asperiores
            soluta alias laboriosam harum rem cumque illum quo ad quos quasi
            magni voluptate nostrum possimus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            quibusdam sequi quas id, praesentium quasi eveniet, ab sunt numquam
            est dolorum ipsa provident illum, accusantium facere aspernatur quo
            voluptates modi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            nisi voluptatum eos delectus modi tempore accusantium sit amet
            debitis! Rem distinctio maiores perspiciatis animi eum error
            corrupti minus expedita ut.
          </p>
          <div className="w-full h-px bg-black my-12"></div>
          <div className="w-full my-12 flex justify-center">
            <h2 className="text-6xl font-bold max-w-7xl text-center leading-[72px]">
              KŌRA es una colección cuidadosamente curada de diseños
              minimalistas, donde cada pieza combina elegancia atemporal y
              funcionalidad, perfecta para realzar espacios modernos con
              propósito y estilo.
            </h2>
          </div>
          <div className="w-full h-px bg-black my-12"></div>
          <Headings as="h2" size="xl" className="my-10">
            Categories
          </Headings>
          <div className="grid grid-cols-3 items-center justify-content gap-8">
            <Headings as="h2" variant="bold" size="xl" className="">
              Show All
            </Headings>
            <Headings as="h2" variant="bold" size="xl" className="">
              Dinner Room
            </Headings>
            <Headings as="h2" variant="bold" size="xl" className="">
              Bedroom
            </Headings>
            <Headings as="h2" variant="bold" size="xl" className="">
              Living Room
            </Headings>
            <Headings as="h2" variant="bold" size="xl" className="">
              Desks
            </Headings>
          </div>
          <div className="w-full h-px bg-black my-12"></div>
          <Headings as="h2" size="xl" className="my-10">
            Details
          </Headings>
          <div className="w-full h-px bg-black my-12"></div>
          <Headings as="h2" size="xl" className="my-10">
            Marquee Banner
          </Headings>
        </main>
      </div>
      <div>
        <BannerMarquee text="Free Shipping for all orders over $ 500" />
      </div>
      <Headings as="h2" size="xl" className="my-10">
        Cards Products
      </Headings>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary border-t border-b border-primary">
        <ProductCard
          id="styleguide-1"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04078_LowRes_07_36270a60-c30a-43eb-bc96-34973cb1e5e2.jpg?v=1756214755&width=1080"
          title="Otis - Mesa de comedor redonda para cuatro personas - Pecan"
          price={159.99}
          isNew
        />
        <FeaturedProductCard
          href="#"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04000_square_lores_08.jpg?v=1756215852&width=1080"
        />
        <ProductCard
          id="styleguide-2"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T03687_LowRes_10_f80ae609-1964-41bb-862d-068dfd887c0d.jpg?v=1756218981&width=1080"
          title="Murphy - Mueble - Verde/Natural"
          price={39.99}
          isNew
        />
        <FeaturedProductCard
          href="#"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04328_LowRes_02_088a0e62-4453-41cd-b94f-0b11c6f85119.jpg?v=1756214300&width=1080"
        />
        <ProductCard
          id="styleguide-3"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04327_Lowres_04.jpg?v=1756215389&width=1080"
          title="Deven - Mueble - Walnut"
          price={29.99}
          isNew
        />
        <ProductCard
          id="styleguide-4"
          imageSrc="https://www.mocka.com.au/cdn/shop/files/T04373_loRes_02.jpg?v=1756215460&width=1080"
          title="Cove - Tres cajones - Midnight"
          price={49.99}
        />
      </div>
    </>
  );
}
