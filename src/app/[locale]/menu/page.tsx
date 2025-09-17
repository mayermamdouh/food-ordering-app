import Menu from "@/components/menu";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getProductsByCategory } from "@/server/db/product";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const categorys = await getProductsByCategory();
  const locale = (await params).locale;

  const translations = await getTrans(locale);
  return (
    <main>
      {categorys.length > 0 ? (
        <>
          {categorys.map((category) => (
            <section key={category.id} className="section-cap">
              <div className="container text-center">
                <h1 className="text-primary font-bold text-4xl italic mb-6">
                  {category.name}
                </h1>
                <Menu items={category.products} />
              </div>
            </section>
          ))}
        </>
      ) : (
        <p className="text-accent text-center py-10 ">
          {translations.noProductsFound}
        </p>
      )}
    </main>
  );
}
