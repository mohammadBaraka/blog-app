import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import { TopCategories } from "./components/TopCategories/TopCategories";
import TopDestenation from "./components/TopDestenation/TopDestenation";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="w-container mx-auto px-8">
        <TopDestenation />
        <TopCategories />
      </div>
      <Footer />
    </div>
  );
}
