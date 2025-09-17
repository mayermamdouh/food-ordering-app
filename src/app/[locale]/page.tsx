import About from "@/components/About";
import BestSellers from "./_components/BestSellers";
import FirstSection from "./_components/firstSection";
import Contact from "@/components/Contact";

export default async function Home() {
  return (
    <main>
      <FirstSection />
      <BestSellers />
      <About />
      <Contact />
    </main>
  );
}
