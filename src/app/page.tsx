import CarouselCard from "@/my-components/home/CarouselCard";
import { NextPage } from "next";

const page: NextPage = () => {
  return (
    <div>
      <h1 className="lg:text-3xl font-bold tracking-wider text-center">
        Dive into the World of Anonymous Messages with WhisperWall.
      </h1>
      <h2 className="text-center lg:text-xl tracking-wide font-semibold">
        Reveal without revealing
      </h2>
      <CarouselCard />
    </div>
  );
};

export default page;
