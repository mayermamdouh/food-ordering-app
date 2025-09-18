import MyLink from "@/components/Link";
import { buttonVariants } from "@/components/ui/button";
import { Languages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";

export default async function FirstSection() {
  const locale = await getCurrentLocale();

  const { home } = await getTrans(locale);
  const { firstSection } = home;
  return (
    <section className="section-gap">
      <div className="container flex items-center">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold">{firstSection.title}</h1>
          <p className="text-accent my-4">{firstSection.description}</p>
          <div className="flex items-center gap-4">
            <MyLink
              href={`/${Routes.MENU}`}
              className={`${buttonVariants({
                size: "lg",
              })} space-x-2 !px-4 !rounded-full uppercase`}
            >
              {firstSection.orderNow}
              <ArrowRightCircle
                className={`!w-5 !h-5 ${
                  locale === Languages.ARABIC ? "rotate-180 " : ""
                }`}
              />
            </MyLink>
            <MyLink
              href={`/${Routes.ABOUT}`}
              className="flex gap-2 items-center text-black hover:text-primary duration-200 transition-colors font-semibold"
            >
              {firstSection.learnMore}
              <ArrowRightCircle
                className={`!w-5 !h-5 ${
                  locale === Languages.ARABIC ? "rotate-180 " : ""
                }`}
              />
            </MyLink>
          </div>
        </div>
        <div className="relative hidden md:block w-full max-w-[400px] h-[210px] overflow-hidden flex-1">
          <Image
            src={`/${locale}/sandwich.png`}
            alt="sandwich"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
