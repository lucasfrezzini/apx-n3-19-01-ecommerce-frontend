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
        <Link href="/details" className="hover:text-primary/70 transition">
          Details
        </Link>
      </li>

      <li>
        <Link href="/store" className="hover:text-primary/70 transition">
          Store
        </Link>
      </li>
    </ul>
  );
}
