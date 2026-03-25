import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-[49px]">
      <h1 className="font-bold text-2xl mb-8">About KŌRA</h1>

      <section className="border border-primary p-6 mb-8">
        <h2 className="font-bold text-lg mb-4">Our Story</h2>
        <p className="opacity-80 leading-relaxed">
          KŌRA was founded in 2020 with a simple belief: furniture should tell a story. 
          Born in a small Brooklyn workshop, we began by handcrafting pieces that blended 
          Scandinavian minimalism with warm, organic materials. Each item carries the mark 
          of its maker and the intention of its purpose.
        </p>
        <p className="opacity-80 leading-relaxed mt-4">
          Today, we collaborate with artisans across North America and Europe to create 
          timeless designs that honor traditional techniques while embracing contemporary 
          aesthetics. Our collections evolve slowly, focusing on enduring quality over 
          fleeting trends.
        </p>
      </section>

      <section className="border border-primary p-6 mb-8">
        <h2 className="font-bold text-lg mb-4">Our Mission</h2>
        <p className="opacity-80 leading-relaxed">
          To create furniture with significance—pieces that aren't just seen, but felt. 
          We believe in designing objects that serve both function and emotion, becoming 
          quieter companions in the stories of daily life.
        </p>
      </section>

      <section className="border border-primary p-6 mb-8">
        <h2 className="font-bold text-lg mb-4">What We Believe</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <span className="flex-shrink-0 text-primary mr-4">•</span>
            <span>Sustainability in every grain: We source FSC-certified woods and use 
              water-based finishes that protect both your home and the planet.</span>
          </div>
          <div className="flex items-start">
            <span className="flex-shrink-0 text-primary mr-4">•</span>
            <span>Craftsmanship that lasts: Our joinery is built to endure generations, 
              not just seasons.</span>
          </div>
          <div className="flex items-start">
            <span className="flex-shrink-0 text-primary mr-4">•</span>
            <span>Design that breathes: We create space between form and function, allowing 
              each piece to exist harmoniously in its environment.</span>
          </div>
          <div className="flex items-start">
            <span className="flex-shrink-0 text-primary mr-4">•</span>
            <span>Honest materials: What you see is what you get—no veneers, no shortcuts, 
              just pure wood, metal, and textile.</span>
          </div>
        </div>
      </section>

      <section className="border border-primary p-6">
        <h2 className="font-bold text-lg mb-4">Join Our Journey</h2>
        <p className="opacity-80 leading-relaxed mb-4">
          We're always looking for kindred spirits who appreciate the quiet beauty of 
          well-made things. Whether you're a designer, architect, or someone who simply 
          loves living with intention—there's a place for you in our story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/contact" 
            className="flex-1 px-6 py-3 bg-primary text-background font-bold hover:opacity-90 transition"
          >
            Get in Touch
          </Link>
          <Link 
            href="/store" 
            className="flex-1 px-6 py-3 border border-primary text-primary hover:bg-primary/10 transition"
          >
            Explore Collections
          </Link>
        </div>
      </section>
    </div>
  );
}