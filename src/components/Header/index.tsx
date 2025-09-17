import MyLink from "../Link";
import Navbar from "./Navbar";
import CartButton from "./CartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButtons from "./authButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

export default async function Header() {
  const locale = await getCurrentLocale();
  const initialSession = await getServerSession(authOptions);
  const translations = await getTrans(locale);
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-5">
        <MyLink
          className="text-primary font-semibold text-2xl"
          href={`/${locale}`}
        >
          🍔 {translations.logo}
        </MyLink>
        <Navbar translations={translations} initialSession={initialSession} />
        <div className="flex gap-2 items-center flex-1 justify-end">
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <AuthButtons
              translations={translations}
              initialSession={initialSession}
            />
            <LanguageSwitcher />
          </div>

          <CartButton />
        </div>
      </div>
    </header>
  );
}
