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
        <div className="text-accent mx-auto mt-4 flex flex-col gap-4 max-w-md">
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Company:</p>
              <p>Foodies Hub</p>
            </div>

            <div>
              <p className="font-semibold">Address:</p>
              <p>123 Main Street, Cairo, Egypt</p>
            </div>

            <div>
              <p className="font-semibold">Phone:</p>
              <p>+20 123 456 7890</p>
            </div>

            <div>
              <p className="font-semibold">Email:</p>
              <p>info@foodieshub.com</p>
            </div>

            <div>
              <p className="font-semibold">Working Hours:</p>
              <p>Mon-Sat: 9:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
