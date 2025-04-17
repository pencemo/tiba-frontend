import { useState } from "react";
import { useParams } from "react-router-dom";
import { useOneCar } from "@/hooks/QueryHooks/useCars";
import { usePorfile } from "@/Context/ProfileContext";
import SuccessPopup from "@/components/Booking/Success";
import Loader from "@/components/ui/loader";
import UserNav from "@/components/User/UserNav";
import CarImageGallery from "@/components/Booking/CarImageGallery";
import CarSpecifications from "@/components/Booking/CarSpecifications";
import BookingForm from "@/components/Booking/BookingForm";
import { Star } from "lucide-react";
import FailPopup from "@/components/Booking/FailMsg";
import StripeElement from "@/components/Booking/StripeElement";
import Footer from "@/components/Navbar/Footer";
import ShowroomInfo from "@/components/Booking/ShowroomInfo";
import { CheckmarkCircle02Icon } from "hugeicons-react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { HiChevronDown } from "react-icons/hi2";

export default function ProductPage() {
  const { id } = useParams();
  const { profile } = usePorfile();
  const [formData, setFormData] = useState({
    name: profile.name || "",
    email: profile.email || "",
    contact: profile.phone || "",
    userId: profile._id || "",
    carId: "",
    showroomId: "",
    totalCost: 0,
    date: "",
  });

  const { data: carData, isLoading } = useOneCar(id);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadElement, setLoadElement] = useState(false);
  const [showFail, setShowFail] = useState(false);

  if (isLoading)
    return (
      <div className="w-full h-screen">
        <Loader />
      </div>
    );
  if (!carData?.data) return <div className="text-center text-2xl font-semibold mt-20">Car not found</div>;

  return (
    <div>
      <div className="min-h-screen bg-background">
        <UserNav />

        {loadElement ? (
          <StripeElement
            formData={formData}
            setFormData={setFormData}
            showSuccess={() => setShowSuccess(true)}
            car={carData.data}
            back={()=>setLoadElement(false)}
          />
        ) : (
          <main className="max-w-[85rem] mx-auto px-4 py-8">
            <div className="grid md:grid-cols-1 gap-3">
              <CarHeader car={carData.data} />
              <CarImageGallery images={carData?.data?.images} />

              <div className="grid md:grid-cols-7 gap-3 gap-x-20 mt-10">
                <div className="md:col-span-4 space-y-12">
                  <CarOptin car={carData.data} />
                  <Pricing car={carData.data} />
                  <CarSpecifications car={carData.data} />
                  {carData.data?.features?.length > 1 && <Features spec={carData.data.features.filter((item)=> item !== '' )} />}
                </div>
                <div className="md:col-span-3 space-y-10">
                  <BookingForm
                    formData={formData}
                    setFormData={setFormData}
                    profile={profile}
                    car={carData.data}
                    onSuccess={() => setLoadElement(true)}
                    onFail={() => setShowFail(true)}
                  />
                  <ShowroomInfo showroom={carData.data?.showroomId} />
                  <DocsNeede />
                </div>
              </div>
            </div>
          </main>
        )}

        <SuccessPopup
          isVisible={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
        <FailPopup isVisible={showFail} onClose={() => setShowFail(false)} />
      </div>
      <Footer />
    </div>
  );
}

function CarHeader({ car }) {
  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold">
          {car.make} {car.model}
        </h1>
        <p className="text text-muted-foreground mb-4">
        Rent in {car.showroomId?.city}: {car.category} {car.seats} Seater, Top Performance, {car.type} category.
        </p>
      </div>
    </>
  );
}
function CarOptin({ car }) {
  return (
    <>
      <div>
        <p className="text-sm text-muted-foreground">
          {car.category || "NO CATEGORY"}
        </p>
        <h1 className="text-3xl font-semibold mb-4 text-foreground">
          {car.make} {car.model}
        </h1>
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
            ))}
            <Star className="w-4 h-4 text-gray-300" />
          </div>
          <span className="text-sm text-muted-foreground">
            {`${(Math.random() * 5 + 5).toFixed(1)}/10, ${(Math.random() * 400 + 100).toFixed(0)} Reviews`}
          </span>
        </div>
      </div>
    </>
  );
}
function Pricing({ car }) {
  const [isSelected, setSelected] = useState(0);
  const [isOpen, setOpen]=useState(false)
  const pricingData = [
    {
      title: "Day",
      price: car.daily_rate.$numberDecimal,
      kmLimit: "250",
    },
    {
      title: "Week",
      price: car.weekly_rate.$numberDecimal,
      kmLimit: "1750",
    },
    {
      title: "Month",
      price: car.monthly_rate.$numberDecimal,
      kmLimit: "6000",
    },
  ];
  return (
    <div>
      <div className="flex items-center gap-5 max-w-3xl">
        <h1 className="text-xl uppercase text-foreground font-semibold">
          Pricing
        </h1>
        <div className="w-full h-[1px] bg-muted-foreground/70"></div>
      </div>
      <div className="border rounded-xl mt-5 divide-y overflow-hidden">
        <div className="grid md:grid-cols-3 max-w-3xl md:divide-x max-md:divide-y">
          {pricingData.map((item, i) => {
            return (
              <div
                onClick={() => setSelected(i)}
                key={i}
                className={`text-2xl font-bold  py-3  flex flex-col items-center justify-center   hover:bg-muted ${
                  isSelected === i ? "bg-muted text-green-600" : "text-foreground"
                } cursor-pointer transition-all dark:bg-zinc-800"`}
              >
                {item.price} AED
                <span className="text-sm font-normal text-muted-foreground">
                  /{item.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="p-5 divide-y ">
          <div className="overflow-hidden py-1.5">
            <div className="flex items-center justify-between ">
              <h1 className="flex items-center gap-2">Kilometer Limit </h1>
              <h1 className="font-semibold">
                {pricingData[isSelected].kmLimit} km
              </h1>
            </div>
          </div>
          <div className="overflow-hidden py-1.5">
            <div onClick={()=>setOpen(!isOpen)} className="flex items-center justify-between cursor-pointer">
              <h1 className="flex items-center gap-2">Additional mileage charge <HiChevronDown className={`${isOpen? '-rotate-180': ''} transition-all `} /></h1>
              <h1 className="font-semibold">
                {car?.addOnCharge?.$numberDecimal || '-'} AED / km
              </h1>
            </div>
            <div className={`${isOpen? 'h-full py-1.5': 'h-0'} `}>
              <h1 className="py-1 text-sm">Additional KM Charges</h1>
              <p className="text-sm text-muted-foreground ">Basic Cars - <span className="text-foreground font-medium">0.50 AED per KM</span></p>
              <p className="text-sm text-muted-foreground">Middle-Class Cars - <span className="text-foreground font-medium">1.00 AED per KM</span></p>
              <p className="text-sm text-muted-foreground">Luxury Cars - <span className="text-foreground font-medium">2.00 AED per KM</span></p>
            </div>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <h1 className="">Deposit</h1>
            <h1 className=" font-semibold">1500 AED</h1>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <h1 className="">VAT Applicable</h1>
            <h1 className=" font-semibold">5%</h1>
          </div>
        </div>
      </div>

      {/* <p className="text-muted-foreground mt-2">
      Deposit: AED 1500, Third Party Insurance
      </p> */}
    </div>
  );
}

function DocsNeede() {
  const [isSelected, setSelected] = useState(0);
  const data =[
    {
      title: "UAE Residents",
      content: ["UAE Driving License ","Emirates ID(Residential Visa may be acceptable)"]
    },
    {
      title: "Tourists visiting the UAE",
      content: ["Passport","Visit Visa","Home Country Driving License","International Driving Permit(IDP)"]
    }
  ]
  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold">Documents you need</h1>
        <p className="text-sm text-muted-foreground ">
          You are eligible to rent a car across the emirates provided you have
          the below mentioned documents valid with you
        </p>
      </div>
      <div className="mt-5 border rounded-lg overflow-hidden">
      <div className="grid grid-cols-2 divide-x border-b">
        {data.map((item, i) => {
        return <div onClick={()=>setSelected(i)} key={i} className={`p-4 cursor-pointer hover:bg-muted flex items-center justify-center ${isSelected === i ? "bg-muted" : ""}`}>
          <h1 className="font-medium ">{item.title}</h1>
        </div>
        })
        }
        
      </div>
        <div className="p-4 space-y-1">
          {data[isSelected].content.map((item, i) => {
          return <div key={i} className="grid grid-cols-12 md:gap-1 gap-2">
            <IoCheckmarkCircleSharp size={20} color="#16a34a" className="col-span-1" />
            <span className="text-muted-foreground col-span-11">{item}</span>
          </div>
        }
        )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-3">
      Visitors from the GCC, US, UK, Canada, Europe and certain other countries can drive with their home country driving license, without the need of an IDP.
        </p>

    </div>
  );
}

function Features({spec}) {
  
  return (
    <div>
      <div className="flex items-center gap-5 max-w-3xl">
        <h1 className="text-xl uppercase text-foreground text-nowrap font-semibold">
        Features & Specs
        </h1>
        <div className="w-full h-[1px] bg-muted-foreground/70"></div>
      </div>
      <div className="mt-5 border rounded-lg overflow-hidden">
      {/* <div className=" border-b">
        <h1 className="text-center py-4">Other Features</h1>
        
      </div> */}
        <div className="p-4 grid md:grid-cols-2  gap-y-2 ">
          {spec.map((item, i) => {
            return (
              <div className="grid grid-cols-12 items-center md:gap-1 gap-2">
                <IoCheckmarkCircleSharp size={20} color="#16a34a" className="col-span-1" />
                <p key={i} className=" text-foreground col-span-11" >{item}</p>
              </div>
            )
          })
          }
        </div>
      </div>
      {/* <p className="text-sm text-muted-foreground mt-3">
      Visitors from the GCC, US, UK, Canada, Europe and certain other countries can drive with their home country driving license, without the need of an IDP.
        </p> */}

    </div>
  );
}
