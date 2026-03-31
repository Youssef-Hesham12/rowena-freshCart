import Categories from "@/components/Home/Categories/Categories";
import MainSlider from "@/components/Home/MainSlider/MainSlider";
import NewsletterSection from "@/components/Home/NewsletterSection/NewsletterSection";
import Products from "@/components/Home/Products/Products";
import PromoSection from "@/components/Home/PromoSection/PromoSection";
import StoreFeatures from "@/components/Home/StoreFeatures/StoreFeatures";

export default function Home() {
  return (
    <>
      {/* main slider */}
      <MainSlider />

      {/* store features */}
      <StoreFeatures />

      {/* categories */}
      <Categories />

      {/* promotions */}
      <PromoSection />

      {/* products */}
      <Products />

      {/* newsletter */}
      <NewsletterSection />
    </>
  );
}
