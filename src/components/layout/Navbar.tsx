"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";

import { hydrateCartAtom } from "@/store/cartAtoms";
import { hydrateAuthAtom } from "@/store/authAtoms";
import { hydrateFavoritesAtom } from "@/store/favoritesAtom";
import { drawerAtom, closeDrawerAtom } from "@/store/uiAtoms";

import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarActions from "./NavbarActions";

import DrawerOverlay from "./DrawerOverlay";
import MenuDrawer from "@/features/menu/MenuDrawer";
import CartDrawer from "@/features/cart/CartDrawer";
import SearchDrawer from "@/features/search/SearchDrawer";
import AuthModal from "@/features/auth/AuthModal";
import StoreCategoriesNav from "@/components/sections/StoreCategoriesNav";

export const Navbar = () => {
  const [drawer] = useAtom(drawerAtom);
  const [, closeDrawer] = useAtom(closeDrawerAtom);
  const [, hydrateCart] = useAtom(hydrateCartAtom);
  const [, hydrateAuth] = useAtom(hydrateAuthAtom);
  const [, hydrateFavorites] = useAtom(hydrateFavoritesAtom);

  const pathname = usePathname();

  useEffect(() => {
    hydrateCart();
    hydrateAuth();
    hydrateFavorites();
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
