import { BsWhatsapp } from "react-icons/bs";
import { IoMdCall } from "react-icons/io";
import imageDemo from "@/assets/no-car-placeholder.webp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { AirplaneSeatIcon, Calendar03Icon, Fuel01Icon } from "hugeicons-react";
import React from "react";
import { HiMapPin} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
const url = import.meta.env.VITE_API_BASE_URL;

function CarBox({ car }) {
  // console.log(car);
  const navigate = useNavigate();
  const handleBooking = (id) => {
    navigate(`/booking/${id}`);
  };
  return (
    <div
      className={`w-full group relative border hover:border-zinc-300 dark:hover:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900 text-foreground  rounded-xl hover:shadow-xl transition-all `}
    >
      <Carousel
        className="w-full relative group"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {car.images.length > 0 ?
            car.images.map((img, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="w-full h-44 border-b overflow-hidden"
                >
                  <img
                    loading="lazy"
                    src={`${img}`}
                    alt=""
                    className="w-full h-44  object-cover"
                  />
                </CarouselItem>
              );
            })
            :<CarouselItem
            className="w-full h-44 border-b overflow-hidden"
          >
            <img
              loading="lazy"
              src={imageDemo}
              alt=""
              className="w-full h-44  object-cover"
            />
          </CarouselItem>
          }
        </CarouselContent>
        {/* <CarouselPrevious className="absolute left-1 size-5 hidden group-hover:flex" />
        <CarouselNext className="absolute right-1 size-5 hidden group-hover:flex" /> */}
      </Carousel>
      {car.category && (
        <h1 className="absolute top-4 right-5 py-0.5 px-3 bg-background text-xs border rounded-full">
          {car.category}
        </h1>
      )}
      <div className="p-5 pt-3">
        <h1 className="text-xl font-semibold">
          {car.make} {car.model}
        </h1>
        <p className="text-sm text-muted-foreground capitalize">
        {/* Mileage: {car.mileage} - {car.transmission}, {car.color} */}
        {car.showroomId?.city}, {car.showroomId?.state}
        </p>
        
        <div className="text-xs text-foreground/80 grid grid-cols-3 gap-1 capitalize mt-3">
          <div className="flex items-center justify-center gap-1 border px-2 py-1 rounded-full">
            <Fuel01Icon size={16} /> {car.fuel_type}
          </div>
          <div className="flex items-center justify-center gap-1 border px-2 py-1 rounded-full">
            <AirplaneSeatIcon size={16} /> {car.seats}
          </div>
          <div className="flex items-center justify-center gap-1 border px-2 py-1 rounded-full">
            <Calendar03Icon size={16} />{car.year}
          </div>
        </div>
        <div className="flex justify-between mt-7">
          <div>
            <p className="text-xl font-bold text-foreground">
            AED {car.daily_rate.$numberDecimal}  
            </p>
            <p className="text-sm text-muted-foreground">Per day</p>
          </div>
          
          <div className="flex gap-1 items-center">
            <a href={`https://api.whatsapp.com/send?phone=+971${car.showroomId?.contactNo}%20&text=${car.make}-${car.model}`} target="_blank" className="p-1.5  rounded-full bg-green-500 text-white">
              <div className=""><BsWhatsapp /></div>
            </a>
            <a href={`tel:${car.showroomId?.contactNo}`} className="p-1.5  bg-foreground text-background rounded-full">
              <div className=""><IoMdCall /></div>
            </a>
            <a href={car.showroomId?.locationLink} className="p-1.5  bg-foreground text-background rounded-full"  target="_blank" >
              <div className=""><HiMapPin /></div>
            </a>
          </div>
        </div>
        
        <Button
          disabled={car.available === false}
          onClick={() => handleBooking(car._id)}
          className="mt-5  rounded-3xl w-full  font-medium"
        >
          {car.available ?'Book Now' : 'Not available'}
        </Button>
      </div>
    </div>
  );
}

export default CarBox;
