"use client";
import MessageCard, {
  type MessageCardProps,
} from "@/my-components/home/MessageCard";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
const messages: MessageCardProps[] = [
  { msgFrom: "Vraj", msg: "Hey there! How are you?", sendTime: "1 hour ago" },
  {
    msgFrom: "Rudra",
    msg: "Can you check the latest update?",
    sendTime: "10 minutes ago",
  },
  {
    msgFrom: "Harsh",
    msg: "Let me know when you're free to chat.",
    sendTime: "2 hours ago",
  },
  {
    msgFrom: "Harry",
    msg: "The project is coming along great!",
    sendTime: "30 minutes ago",
  },
  {
    msgFrom: "Viraj",
    msg: "Thanks for the help earlier!",
    sendTime: "5 hours ago",
  },
] as const;
const CarouselCard = () => {
  return (
    <Carousel
      className="w-full mx-auto"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {messages.map((item) => (
          <CarouselItem key={item.msg}>
            <MessageCard {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselCard;
