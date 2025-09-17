import MyLink from "@/components/Link";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Product } from "@prisma/client";
import Image from "next/image";

async function MenuItems({ products }: { products: Product[] }) {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  return products && products.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:max-w-[650px] mx-auto">
      {products.map((product) => (
        <li
          key={product.id}
          className="bg-gray-100 rounded-xl hover:bg-gray-200 border border-gray-200 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <MyLink
            href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${product.id}/${Pages.EDIT}`}
            className="flex flex-col items-center gap-3 p-6"
          >
            <div className="w-24 h-24 relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <h3 className="text-lg font-semibold text-accent text-center">
              {product.name}
            </h3>
          </MyLink>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center text-lg mt-6">
      {translations.noProductsFound}
    </p>
  );
}

export default MenuItems;
