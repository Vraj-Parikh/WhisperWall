import CarouselCard from "@/my-components/home/CarouselCard";
import { NextPage } from "next";

const page: NextPage = () => {
  return (
    <div className="flex flex-grow justify-center items-center px-8">
      <div className="space-y-4 xxs:space-y-6 md:space-y-8 lg:space-y-12">
        <div className="space-y-1">
          <h1 className="text-sm xxs:text-base sm:text-2xl lg:text-3xl font-bold tracking-wider text-center leading-loose">
            Dive into the World of Anonymous Messages with Whisper Wall.
          </h1>
          <h2 className="text-sm xxs:text-base text-center sm:text-lg lg:text-xl tracking-wide xs:font-semibold italic">
            Reveal without revealing
          </h2>
        </div>
        <div className="w-screen px-8 max-w-md md:max-w-lg mx-auto">
          <CarouselCard />
        </div>
      </div>
    </div>
  );
};

export default page;
