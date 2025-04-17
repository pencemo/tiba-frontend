// import Cars from "@/Pages/Cars"
import { useFilterContext } from "@/Context/filterContext";
import CarsGrid from "@/components/Cars/CarsGrid";
import { AppSidebar } from "@/components/Cars/pages/app-sidebar";
import NoData from "@/components/Error/NoData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAllCarsUser } from "@/hooks/QueryHooks/useCars";
import { useEffect, useState } from "react";

export default function CarListPage() {
  const { search, carMakes, category, sort, fuleType, showroom } = useFilterContext();

  const [carData, setCardata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, isError } = useAllCarsUser(currentPage, 10);

  useEffect(() => {
    if (data && data.data) {
      setCardata(data.data);
      setCurrentPage(Number(data.currentPage));
    }
  }, [data]);

  const filteredData = carData.filter((car) => {
    return (
      car.make.toLowerCase().includes(search.toLowerCase()) &&
      (category.length === 0 || category.map(c => c.toLowerCase()).includes(car.category.toLowerCase())) &&
      (carMakes.length === 0 || carMakes.map(m => m.toLowerCase()).includes(car.make.toLowerCase())) &&
      (fuleType.length === 0 || fuleType.toLowerCase() === 'all' || fuleType.toLowerCase() === car.fuel_type.toLowerCase()) &&
      (showroom.length === 0 || showroom.toLowerCase() === 'all' || showroom.toLowerCase() === car.showroomId._id.toLowerCase())
    );
  });
  
  const sortedData = filteredData.sort((a, b) => {
    if (sort === "Price") {
      return a.daily_rate.$numberDecimal - b.daily_rate.$numberDecimal; // Sort by price (ascending)
    } else if (sort === "Mileage") {
      return a.mileage - b.mileage; // Sort by mileage (ascending)
    } else if (sort === "Year") {
      return b.year - a.year; // Sort by year (ascending)
    } else {
      return 0; // No sorting
    }
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky z-50 top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink to="/">
            Home
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Cars</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {isLoading ? 
          <Loader />
         : data.status === 200 ? <div className="w-full h-screen"><NoData/> </div>: (
          <CarsGrid
            error={error}
            carData={sortedData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={data.totalPages}
            totalCars={data.totalCars}
          />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
