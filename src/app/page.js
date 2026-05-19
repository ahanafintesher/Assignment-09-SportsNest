

import TopPicks from "@/components/toppicks/TopPicks";
;

import Banner from "@/components/banner/Banner";
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";
import FeaturedSection from "@/components/featured/FeaturedSection";

export default function Home() {
  return (
  <div>
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <TopPicks></TopPicks>
      <WhyChooseUs></WhyChooseUs>
  </div>
  );
}
