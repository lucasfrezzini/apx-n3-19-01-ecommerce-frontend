export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-[49px]">
      <h1 className="font-bold text-2xl mb-8">Contact</h1>

      <section className="border border-primary p-6 mb-8">
        <h2 className="font-bold text-lg mb-4">Get in Touch</h2>
        <div className="space-y-3 opacity-80">
          <p className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span>hello@kora.furniture</span>
          </p>
          <p className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span>+1 (555) 123-4567</span>
          </p>
          <p className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>123 Design District, Brooklyn, NY 11201</span>
          </p>
        </div>
      </section>

      <section className="border border-primary p-6 mb-8">
        <h2 className="font-bold text-lg mb-4">Opening Hours</h2>
        <div className="space-y-2 opacity-80">
          <p className="flex justify-between">
            <span>Monday - Friday</span>
            <span>9:00 AM - 6:00 PM</span>
          </p>
          <p className="flex justify-between">
            <span>Saturday</span>
            <span>10:00 AM - 4:00 PM</span>
          </p>
          <p className="flex justify-between">
            <span>Sunday</span>
            <span>Closed</span>
          </p>
        </div>
      </section>

      <section className="border border-primary p-6 mb-8">
        <h2 className="font-bold text-lg mb-4">Follow Us</h2>
        <div className="flex gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 border border-primary hover:bg-primary hover:text-background transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 border border-primary hover:bg-primary hover:text-background transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.3 3.2 8.6 3.9c2.5.3 3.8.6 5.4-1.3 2-2.3 2.6-4.4.8-5.9s4.8-1.2 5.2-.6"></path>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 border border-primary hover:bg-primary hover:text-background transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </section>

      <section className="border border-primary p-6">
        <h2 className="font-bold text-lg mb-4">Visit Our Showroom</h2>
        <div className="w-full h-64 md:h-80 bg-gray-100 border border-primary">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a165bed7d4d%3A0x8b1a4d0c8e8e4d3d!2sBrooklyn%2C%20NY%2011201!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}