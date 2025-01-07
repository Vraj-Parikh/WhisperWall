import MessageCard, {
  type MessageCardProps,
} from "@/my-components/home/MessageCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
      className="w-10/12 lg:max-w-xl mx-auto"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselPrevious />
      <CarouselContent>
        {messages.map((item) => (
          <CarouselItem key={item.msg}>
            <MessageCard {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselCard;
