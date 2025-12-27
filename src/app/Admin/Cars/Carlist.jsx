import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { useAllCars, useCarDeleteMute, useCarSatusChange } from "@/hooks/QueryHooks/useCars";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteAlert } from "@/components/CarCopm/DeleteAlert";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Add01Icon } from "hugeicons-react";
import Loader from "@/components/ui/loader";
import { Badge } from "@/components/ui/badge";
import { EditPopup } from "@/components/CarCopm/EditPopup";
import { usePorfile } from "@/Context/ProfileContext";
import imageDemo from "@/assets/no-car-placeholder.webp";
import { Switch } from "@/components/ui/switch";
const url = import.meta.env.VITE_API_BASE_URL

function Carlist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, error, isLoading } = useAllCars(currentPage, limit);
  const {mutate : statusMutate, isSuccess: Success, isError: Error} = useCarSatusChange()
  const { mutate, isError, isSuccess } = useCarDeleteMute();
  const { toast } = useToast();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const {profile}=usePorfile()
  const navigate = useNavigate()

  useEffect(() => {
    if (data && data.data) {
      setFilteredUsers(data.data);
    }
    if (data) {
      setTotalPage(data.totalPages);
    }
  }, [data]);

  const filterUsers = (term) => {
    if (data && data.data) {
      const filtered = data.data.filter(
        (car) =>
          car.make.toLowerCase().includes(term.toLowerCase()) ||
          car.model.toLowerCase().includes(term.toLowerCase()) ||
          car.color.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleSubmit = (id) => {
    try {
      mutate(id, {
        onSuccess: (data) => {
          if(data.success){
            toast({
              title: "Delete success",
              description: "Car data deleted successfully",
            });
          }else{
            toast({
              title: "Error",
              description: data.message,
            })
          }
        },
        onError: () => {
          toast({
          title: "Error",
          description: 'Error to delete car data',
        });
        }
      });
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChage = (id, status) => {
    try {
      statusMutate({ id, status }, {
        onSuccess: (data) => {
          if(data.success){
            toast({
              title: "Status change success",
              description: "Car status changed successfully",
            });
          }else{
            toast({
              title: "Error",
              description: "Error to change car status",
            });
          }
        }
      }
      );
      
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-[85rem] w-full p-3 mx-auto overflow-x-auto">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              filterUsers(e.target.value);
            }}
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            <Select
              value={limit.toString()}
              onValueChange={(value) => {
                setLimit(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select rows per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
            {profile.role === 'subadmin'&&<Link to="/admin/manage-cars/add-car">
              <Button>
                Add a car <Add01Icon />
              </Button>
            </Link>}
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead className="w-[50px]">Avatar</TableHead>
                <TableHead >Make</TableHead>
                <TableHead className="">Model</TableHead>
                <TableHead className="">Year</TableHead>
                <TableHead className=" ">Daily Rate</TableHead>
                <TableHead className=" ">Color</TableHead>
                <TableHead className=" ">Date</TableHead>
                {profile.role === 'admin'&& <TableHead className=" ">Showroom</TableHead>}
                <TableHead className=" ">Status</TableHead>
                <TableHead className=" "></TableHead>
                <TableHead className=" "></TableHead>
                <TableHead className=" "></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((car, i) => (
                <TableRow key={i}>
                  <TableCell className="">{i + 1}</TableCell>
                  <TableCell className="">
                    <div className="w-14 h-10 bg-gray-200 rounded-md border overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={car.images.length > 0 ? car.images[0] : imageDemo}
                        alt=""
                      />
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">{car.make}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>{car.daily_rate.$numberDecimal} AED /day</TableCell>
                  <TableCell>{car.color || "No data"}</TableCell>
                  <TableCell className="">
                    {format(new Date(car.createdAt), "PP")}
                  </TableCell>
                  {profile.role === 'admin'&&<TableCell>{car.showroomId?.name || <span className="text-muted-foreground">No data</span>}</TableCell>}
                  <TableCell className="">
                    {car.available ? (
                      <Badge variant={"outline"}>Available</Badge>
                    ) : (
                      <Badge variant={"outline"}>Not Available</Badge>
                    )}
                  </TableCell>
                  <TableCell className="">
                    <Button
                      variant="outline"
                      size='sm'
                      onClick={() => {
                        navigate(`edit/${car._id}`)
                      }}
                    >
                      Edit Car
                    </Button>
                  </TableCell>
                  <TableCell className="">
                    <DeleteAlert deleteFn={() => handleSubmit(car._id)} />
                  </TableCell>
                  <TableCell className="">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-40 p-4">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard.writeText(car._id)}
                        >
                          Copy Car ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          // onClick={() => handleStatusChage(car._id, car.available)}
                        >
                          <div className="flex items-center gap-4">
                          Change status
                          <Switch
                            checked={car.available}
                            onCheckedChange={() => handleStatusChage(car._id, car.available)}
                          />
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* {isEditOpen && (
            <EditPopup
              open={isEditOpen}
              onOpenChange={setIsEditOpen}
              car={selectedCar}
            />
          )} */}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-zinc-700">
            <span className="font-medium text-zinc-900">{data.totalCars}</span>{" "}
            Cars
          </div>

          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPage}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPage))
              }
              disabled={currentPage === totalPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPage)}
              disabled={currentPage === totalPage}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carlist;
