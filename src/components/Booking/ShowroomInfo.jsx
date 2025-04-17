import { BsEnvelope, BsFillTelephoneFill, BsWhatsapp } from "react-icons/bs";
import { HiEnvelopeOpen, HiMapPin, HiPhone } from "react-icons/hi2";
import { MdLocationPin } from "react-icons/md";
export default function ShowroomInfo({ showroom }) {
  // const specs = [
  //   { label: "Make", value: car?.make, icon: Car01Icon },
  //   { label: "Model", value: car?.model, icon: Car01Icon },
  //   { label: "Transmission", value: car?.transmission, icon: Settings02Icon },
  //   { label: "Fuel Type", value: car?.fuel_type, icon: DropletIcon },
  //   { label: "Seats", value: `${car?.seats} seats`, icon: AirplaneSeatIcon },
  //   { label: "Year", value: car?.year, icon: Calendar03Icon },
  //   { label: "Color", value: car?.color, icon: PaintBoardIcon },
  //   { label: "Category", value: car?.category, icon: SecurityCheckIcon },
  // ];
  return (
    <div>
      <div className="flex  items-center gap-5 max-w-3xl">
        <h1 className="text-xl text-nowrap uppercase text-foreground font-semibold">
          Location
        </h1>
        <div className="w-full max-md:hidden h-[1px] bg-muted-foreground/70"></div>
      </div>

      <div className="border rounded-lg p-4 mt-3">
        <h1 className="text-lg font-medium">{showroom.name}</h1>
        <h4 className="text-sm text-muted-foreground">{showroom.city}, {showroom.state}, {showroom.country}</h4>
        <p className="text-muted-foreground">{showroom.address}</p>
        <div className="flex items-center gap-2 mt-5">
            <a href={`tell:${showroom.contactNo}`} className="p-2.5 border bg-foreground hover:bg-foreground/80 text-background rounded-full">
            <HiPhone />
            </a>
            <a href={`https://api.whatsapp.com/send?phone=+971${showroom.contactNo}`} target="_blank" className="p-2.5 border bg-foreground hover:bg-foreground/80 text-background rounded-full">
                <BsWhatsapp/>
            </a>
            <a href={`mailto:${showroom.email}`} className="p-2.5 border bg-foreground hover:bg-foreground/80 text-background rounded-full">
            <HiEnvelopeOpen />
            </a>
            <a href={showroom.locationLink} target="_blank" className="p-2.5 border bg-foreground hover:bg-foreground/80 text-background rounded-full">
            <HiMapPin />
            </a>
        </div>
      </div>
    </div>
  );
}
