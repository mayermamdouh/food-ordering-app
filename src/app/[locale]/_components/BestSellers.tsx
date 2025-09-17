import Menu from "@/components/menu";
import ShareHeading from "@/components/share-heading";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { getBestSeller } from "@/server/db/product";

export default async function BestSellers() {
  const products = await getBestSeller(3);

  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { bestSeller } = home;

  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <ShareHeading
            title={bestSeller.OurBestSellers}
            subTitle={bestSeller.checkOut}
          />
          <Menu items={products} />
        </div>
      </div>
    </section>
  );
}
