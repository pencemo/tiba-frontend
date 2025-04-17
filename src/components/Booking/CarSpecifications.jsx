import { AirplaneSeatIcon, Calendar03Icon, Car01Icon, DropletIcon, PaintBoardIcon, SecurityCheckIcon, Settings02Icon } from "hugeicons-react";

export default function CarSpecifications({ car }) {
    const specs = [
      { label: "Make", value: car?.make, icon: Car01Icon },
      { label: "Model", value: car?.model, icon: Car01Icon },
      { label: "Transmission", value: car?.transmission, icon: Settings02Icon },
      { label: "Fuel Type", value: car?.fuel_type, icon: DropletIcon },
      { label: "Seats", value: `${car?.seats} seats`, icon: AirplaneSeatIcon },
      { label: "Year", value: car?.year, icon: Calendar03Icon },
      { label: "Color", value: car?.color, icon: PaintBoardIcon },
      { label: "Category", value: car?.category, icon: SecurityCheckIcon },
    ];
  

    return (
      <div>
        <div className="flex  items-center gap-5 max-w-3xl">
          <h1 className="text-xl text-nowrap uppercase text-foreground font-semibold">Car Overview</h1>
          <div className="w-full h-[1px] bg-muted-foreground/70"></div>
        </div>
      
      <div className="grid md:grid-cols-2 gap-4 py-4  max-w-3xl">
        
        {specs.map((spec, index) =>{
          return (
            <div key={index} className="border py-3 hover:bg-muted px-4 rounded-md flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <spec.icon size={20} className="text-muted-foreground" />
                <h1 className="text-sm text-foreground capitalize">{spec.label || '-'}</h1>
              </div>
              <h1 className="font-medium text-foreground text-sm  capitalize">{spec.value}</h1>
            </div>
          )
        })}
              
            </div>
            </div>
      
    );
  }