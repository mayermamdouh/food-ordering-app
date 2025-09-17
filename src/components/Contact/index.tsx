import React from "react";
import ShareHeading from "../share-heading";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const Index = async () => {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { contact } = home;
  return (
    <section className="section-gap">
      <div className="container text-center">
        <ShareHeading
          title={contact.contactUs}
          subTitle={contact["Don'tHesitate"]}
        />
        <div className="text-accent mx-auto mt-4 flex flex-col gap-4 max-w-md"></div>
      </div>
    </section>
  );
};

export default Index;
