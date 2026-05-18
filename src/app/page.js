import Image from "next/image";
import Banner from "./components/navbar/banner/Banner";
import FeaturedFacilities from "./components/featured/FeaturedFacilities";

export default function Home() {
  return (
  <div>
      <Banner></Banner>
      <FeaturedFacilities></FeaturedFacilities>
  </div>
  );
}
