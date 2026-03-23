"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";

import { hydrateCartAtom } from "@/src/store/cartAtoms";
import { hydrateAuthAtom } from "@/src/store/authAtoms";
import { drawerAtom, closeDrawerAtom } from "@/src/store/uiAtoms";

import NavbarLogo from "../ui/navbar/NavbarLogo";
import NavbarLinks from "../ui/navbar/NavbarLinks";
import NavbarActions from "../ui/navbar/NavbarActions";

import DrawerOverlay from "../ui/drawers/DrawerOverlay";
import MenuDrawer from "../ui/drawers/MenuDrawer";
import CartDrawer from "../ui/drawers/CartDrawer";
import SearchDrawer from "../ui/drawers/SearchDrawer";
import AuthModal from "../ui/auth/AuthModal";
import StoreCategoriesNav from "../ui/StoreCategoriesNav";

export const Navbar = () => {
  const [drawer] = useAtom(drawerAtom);
  const [, closeDrawer] = useAtom(closeDrawerAtom);
  const [, hydrateCart] = useAtom(hydrateCartAtom);
  const [, hydrateAuth] = useAtom(hydrateAuthAtom);

  const pathname = usePathname();

  useEffect(() => {
    hydrateCart();
    hydrateAuth();
  }, []);

  useEffect(() => {
    closeDrawer();
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const isStorePage = pathname.startsWith("/store");

  return (
    <>
      <nav className="fixed z-60 w-full top-0 left-0 flex flex-col bg-background/30 backdrop-blur-lg border-b border-primary">
        <div className="flex items-center justify-between px-[30px] py-2">
          <NavbarActions variant="menu" />

          <NavbarLogo />

          <NavbarLinks />

          <NavbarActions variant="actions" />
        </div>

        {isStorePage && <StoreCategoriesNav />}
      </nav>

      <DrawerOverlay />

      <MenuDrawer />
      <CartDrawer />
      <SearchDrawer />
      <AuthModal />
    </>
  );
};
