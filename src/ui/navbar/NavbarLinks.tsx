import Link from "next/link";

export default function NavbarLinks() {
  return (
    <ul className="font-bold md:flex hidden items-center gap-10">
      <li>
        <Link href="/" className="hover:text-primary/70 transition">
          Home
        </Link>
      </li>

      <li>
        <Link href="/store" className="hover:text-primary/70 transition">
          Shop
        </Link>
      </li>

      <li>
        <Link href="/about" className="hover:text-primary/70 transition">
          About
        </Link>
      </li>

      <li>
        <Link href="/contact" className="hover:text-primary/70 transition">
          Contact
        </Link>
      </li>
    </ul>
  );
}
