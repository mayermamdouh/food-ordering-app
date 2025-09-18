import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";

import { redirect } from "next/navigation";
import Form from "../../_components/Form";

import getTrans from "@/lib/translation";
import { getCategories } from "@/server/db/category";
import { getProduct, getProducts } from "@/server/db/product";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({ productId: product.id }));
}
async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>;
}) {
  const { productId, locale } = await params;
  const translations = await getTrans(locale);
  const product = await getProduct(productId);
  const categories = await getCategories();

  if (!product) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
  }

  return (
    <main>
      <section>
        <div className="container ">
          <Form
            categories={categories}
            translations={translations}
            product={product}
          />
        </div>
      </section>
    </main>
  );
}

export default EditProductPage;
