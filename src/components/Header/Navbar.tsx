"use client";
import { Routes } from "@/constants/enums";
import MyLink from "../Link";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import AuthButtons from "./authButtons";
import LanguageSwitcher from "./LanguageSwitcher";
import { Translations } from "@/types/translations";
import { Session } from "next-auth";
import { useClientSession } from "@/hooks/useClientSession";
import { UserRole } from "@prisma/client";

export default function Navbar({
  translations,
  initialSession,
}: {
  translations: Translations;
  initialSession: Session | null;
}) {
  const session = useClientSession(initialSession);
  const links = [
    { id: 1, href: Routes.MENU, label: translations.navbar.menu },
    { id: 2, href: Routes.ABOUT, label: translations.navbar.about },
    { id: 3, href: Routes.CONTACT, label: translations.navbar.contact },
  ];
  const { locale } = useParams();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(false);
  const isAdmin = session.data?.user.role === UserRole.ADMIN;
  return (
    <nav className="order-last lg:order-none">
      <Button
        size="sm"
        variant="secondary"
        className="lg:hidden"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <Menu className="!w-6 !h-6"></Menu>
      </Button>
      <ul
        className={`fixed lg:static ${openMenu ? "left-0 z-50" : "-left-full"} top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
      >
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-10 right-10 lg:hidden"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <XIcon className="!w-6 !h-6"></XIcon>
        </Button>
        {links.map(({ id, href, label }) => (
          <li key={id}>
            <MyLink
              onClick={() => setOpenMenu(false)}
              href={`/${locale}/${href}`}
              className={`
             hover:text-primary duration-200 transition-colors font-semibold ${pathname.startsWith(`/${locale}/${href}`) ? "text-primary" : "text-accent"}`}
            >
              {label}
            </MyLink>
          </li>
        ))}
        {session.data?.user && (
          <li>
            <MyLink
              href={
                isAdmin
                  ? `/${locale}/${Routes.ADMIN}`
                  : `/${locale}/${Routes.PROFILE}`
              }
              onClick={() => setOpenMenu(false)}
              className={`${
                pathname.startsWith(
                  isAdmin
                    ? `/${locale}/${Routes.ADMIN}`
                    : `/${locale}/${Routes.PROFILE}`
                )
                  ? "text-primary"
                  : "text-accent"
              } hover:text-primary duration-200 transition-colors font-semibold`}
            >
              {isAdmin
                ? translations.navbar.admin
                : translations.navbar.profile}
            </MyLink>
          </li>
        )}
        <li className="lg:hidden flex flex-col gap-4">
          <div onClick={() => setOpenMenu(false)}>
            <AuthButtons
              translations={translations}
              initialSession={initialSession}
            />
          </div>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
}
